import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";

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
    constructor(private http: HttpClient) { }
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
                case 'INVALID_PASSWORD':
                    errorMessage = 'This password is not correct.';
                    break;
            }
            throw new Error(errorMessage);
        }))
    }
}