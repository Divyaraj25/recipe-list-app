import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    loginsuccess:string = null;
    constructor(private authService: AuthService) { }
    onHandleError() {
        this.error = null
    }
    loginSuccess(){
        this.loginsuccess = null;
    }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(f: NgForm) {
        if (!f.valid) {
            return;
        }
        const email = f.value.email
        const password = f.value.password

        this.isLoading = true
        if (this.isLoginMode) {
            this.authService.login(email, password).subscribe(
                resData => {
                    this.loginsuccess = 'Login Successfull'
                    console.log(resData)
                    this.isLoading = false
                },
                errorMessage => {
                    console.log(errorMessage)
                    this.error = errorMessage
                    this.isLoading = false
                }
            )
            console.log(f.value);
            f.reset()
        } else {
            this.authService.signup(email, password).subscribe(
                resData => {
                    console.log(resData)
                    this.isLoginMode = true
                    this.isLoading = false
                },
                errorMessage => {
                    console.log(errorMessage)
                    this.error = errorMessage
                    this.isLoading = false
                }
            )
            console.log(f.value);
            f.reset()
        }
    }
}