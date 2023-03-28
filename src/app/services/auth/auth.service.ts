/* eslint-disable @ngrx/no-store-subscription */
/* eslint-disable @ngrx/prefer-selector-in-select */
/* eslint-disable @ngrx/no-typed-global-store */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
// import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';


import {
  LoginState,
  login,
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess
} from '@store/login';
import { AppState } from '@store/app-state.interface';

import { User } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store<AppState>,
    public afAuth: AngularFireAuth
  ) { }

  recoverPassword(email: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        observer.next();
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
        observer.complete();
      })
    });
  }

  login(email: string, password: string): Observable<User> {
    return new Observable<User>((observer) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        const user: User = {
          id: res.user.uid,
          email: email
        };
        observer.next(user);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  activateLoginState(email: string, password: string): void {
    this.store.dispatch(login({email: email, password: password}));
  }

  activateLoginSuccessState(user: User): void {
    this.store.dispatch(loginSuccess({user}));
  }

  activateLoginFailState(error: any = true): void {
    this.store.dispatch(loginFail({error}));
  }

  recoveringPasswordState(email: string): void {
    this.store.dispatch(recoverPassword({email: email}));
  }

  recoveredPasswordState(): void {
    this.store.dispatch(recoverPasswordSuccess());
  }

  recoverPasswordFailed(error: any = true): void {
    this.store.dispatch(recoverPasswordFail(error));
  }

  loginState(): Observable<LoginState> {
    return this.store.select('login');
  }
}
