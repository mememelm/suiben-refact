import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, BehaviorSubject } from 'rxjs';
import * as firebase from "firebase/app";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ANIMATION_TYPES, INg2LoadingSpinnerConfig } from 'ng2-loading-spinner';


@Injectable({
    providedIn: 'root'
})
export class AuthentificationService implements CanActivate {

    userData: Observable<firebase.User>;
    isAuthentified = false;
    spinner: boolean = false;

    public user: any

    spinnerConfig: INg2LoadingSpinnerConfig = {
        animationType: ANIMATION_TYPES.cubeGrid,
        spinnerColor: '#007E3A',
        backdropColor: 'white'
    };

    constructor(
        public angularFireAuth: AngularFireAuth,
        public router: Router,
        public toastrService: ToastrService,
    ) {
        this.userData = this.angularFireAuth.authState;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.isAuthentified) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

    signUp(email: string, password: string) {
        this.angularFireAuth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.toastrService.success('Enregistrement réussi');
            })
            .catch(() => {
                this.toastrService.error('Format email incorrect ou vérifiez que le mot de passe doit au moins contenir 6 caractères');
            });
    }

    signIn(email: string, password: string) {
        this.spinner = true;
        this.angularFireAuth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setTimeout(() => {
                    this.spinner = false
                }, 3000);
                this.isAuthentified = true
                this.currentUser()
                this.router.navigate(['/exploitant'])
                this.toastrService.success(email)
            })
            .catch(() => {
                this.signOut();
                this.toastrService.error('Email ou mot de passe incorrect');
            });
    }

    signOut() {
        this.isAuthentified = false;
        this.spinner = false;
        this.angularFireAuth.signOut()
            .then(() => {
                this.router.navigate(['/login']);
            });
    }

    returnLogin() {
        return this.spinner = false;
    }

    listenner() {
        document.addEventListener('click', () => this.returnLogin());
        document.addEventListener('keypress', () => this.returnLogin());
    }

    currentUser() {
        this.angularFireAuth.authState.subscribe(
            user => {
                if (user !== null) {
                    this.user = user.email;
                    console.log(this.user);
                    localStorage.setItem('user', this.user)
                }
            }
        );
    }
}
