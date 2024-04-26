import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, Subscription, catchError, tap } from "rxjs";
import { UserModel } from "./user.model";
import { Router } from "@angular/router";

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
export class AuthService {
    user = new BehaviorSubject<UserModel>(null)
    constructor(private http: HttpClient, private router:Router) { }
    signup(email: string, password: string) {
        return this.http.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4HaQUNctZt0LcIk_PKhT9Cz7CL67xFjo',
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
        }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4HaQUNctZt0LcIk_PKhT9Cz7CL67xFjo',
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
        }))
    }
    logout(){
        this.user.next(null)
        this.router.navigate(['/auth'])
    }
}