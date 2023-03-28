import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '@app/services';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from '.';

@Injectable()
export class LoginEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {
    }

    recoverPassword$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(recoverPassword),
            switchMap((payload: {email: string}) => this.authService.recoverPassword(payload.email).pipe(
                map(() => recoverPasswordSuccess()),
                catchError(error => of(recoverPasswordFail({error})))
            ))
        )
    });

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(login),
            switchMap((payload: {email: string, password: string}) => 
            this.authService.login(payload.email, payload.password).pipe(
                map(user => loginSuccess({user})),
                catchError(error => of(loginFail({error})))
            ))
        )
    });
}