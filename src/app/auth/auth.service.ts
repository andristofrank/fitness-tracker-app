import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { TrainingService } from '../training/exercise.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router, 
        private angularfireAuth: AngularFireAuth, 
        private trainingService: TrainingService,
        private matSnackBar: MatSnackBar 
    ) {}

    initAuthListener() {
        this.angularfireAuth.authState.subscribe(user => {
            if(user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.angularfireAuth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password
        ).then(result => {
            console.log(result);
        })
        .catch(error => {
            this.matSnackBar.open(error.message, null, {
                duration: 3000
            });
        })
    }

    login(authData: AuthData) {
        this.angularfireAuth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                this.matSnackBar.open(error.message, null, {
                    duration: 3000
                });
            })
    }

    logout() {
        this.angularfireAuth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}