/* eslint-disable @ngrx/no-store-subscription */
/* eslint-disable @ngrx/prefer-selector-in-select */
/* eslint-disable @ngrx/no-typed-global-store */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { LoginState, login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from '@store/login';
import { AppState } from '@store/app-state.interface';
import { User } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store<AppState>
  ) { }

  recoverPassword(email: string): Observable<void> {
    return new Observable<void>((observer) => {
      setTimeout(() => {
        if(!email || email == 'error@email.com') {
          observer.error({message: 'Email not found'});
        }
        observer.next();
        observer.complete();
      }, 3000);
    });
  }

  login(email: string, password: string): Observable<User> {
    return new Observable<User>((observer) => {
      setTimeout(() => {
        if(!email || email == 'error@email.com') {
          observer.error({message: 'Email not found'});
          observer.next();
        } else {
          const user:  User = {
            id: 1,
            email: email
          };
          observer.next(user);
        }
        observer.complete();
      }, 3000);
    });
  }

  activateLoginState(): void {
    this.store.dispatch(login());
  }

  activateLoginSuccessState(user: User): void {
    this.store.dispatch(loginSuccess({user}));
  }

  activateLoginFailState(error: any = true): void {
    this.store.dispatch(loginFail({error}));
  }

  recoveringPasswordState(): void {
    this.store.dispatch(recoverPassword());
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
