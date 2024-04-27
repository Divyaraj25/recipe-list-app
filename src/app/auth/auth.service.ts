import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject, Subscription, catchError, tap } from "rxjs";

import { UserModel } from "./user.model";
import { environment } from "../../environments/environment";

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    user = new BehaviorSubject<UserModel>(null)
    tokenExpirationTimer = null
    constructor(private http: HttpClient, private router:Router) { }
    signup(email: string, password: string) {
        return this.http.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(responseError => {
            console.log(responseError);
            let errorMessage = 'An unknown error occurred!';
            if (!responseError.error || !responseError.error.error) {
                throw new Error(errorMessage);
            }
            switch (responseError.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already';
                    break;
            }
            throw new Error(errorMessage);
        }), tap(resData => {
            const expiration = new Date(new Date().getTime() + +resData['expiresIn'] * 1000);
            const user = new UserModel(resData['email'], resData['localId'], resData['idToken'], expiration);
            this.user.next(user);
            this.autoLogout(resData['expiresIn'] * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
        }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(responseError => {
            console.log(responseError);
            let errorMessage = 'An unknown error occurred!';
            if (!responseError.error || !responseError.error.error) {
                throw new Error(errorMessage);
            }
            switch (responseError.error.error.message) {
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exist.';
                    break;
                case "INVALID_LOGIN_CREDENTIALS":
                    errorMessage = 'invalid login credentials';
                    break;
            }
            throw new Error(errorMessage);
        }), tap(resData => {
            const expiration = new Date(new Date().getTime() + +resData['expiresIn'] * 1000);
            const user = new UserModel(resData['email'], resData['localId'], resData['idToken'], expiration);
            this.user.next(user);
            this.autoLogout(+resData.expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
        }))
    }
    logout(){
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null
    }
    autoLogin(){
        const userData:{
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'))
        if(!userData){
            return
        }
        const loadedUser = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
        if(loadedUser.token){
            this.user.next(loadedUser)
            this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime())
        }
    }
    autoLogout(expirationDuration: number){
        setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }
}