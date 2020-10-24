import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services';


@Component({
    selector: 'app-authentification-login',
    templateUrl: './authentification-login.component.html',
    styleUrls: ['./authentification-login.component.css']
})
export class AuthentificationLoginComponent implements OnInit {

    email: string
    password: string

    emailSign: string
    passwordSign: string
    constructor(public authentificationService: AuthentificationService) { }

    ngOnInit(): void {
    }

    loginUser(){
        this.authentificationService.signIn(this.email, this.password);
        this.email = this.password = '';
    }

    signUpUser(){
        this.authentificationService.signUp(this.emailSign, this.passwordSign)
        this.emailSign = this.passwordSign = ''
    }

}