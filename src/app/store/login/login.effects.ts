import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '@app/services';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from '.';

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
}