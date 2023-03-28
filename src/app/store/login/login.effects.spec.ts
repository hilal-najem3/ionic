import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';

import { Action, StoreModule } from '@ngrx/store';

import { LoginEffects, login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from '.';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { AuthService } from '@app/services';
import { User } from '@app/models';

describe('Login effects', () => {
    let effects: LoginEffects;
    let actions$: Observable<Action>;
    let error: {error: 'error'};
    let authServiceMock = {
        recoverPassword: (email: string) => {
            if(email == 'error@email.com') {
                return throwError(error);
            }
            return of({});
        },
        login: (email: string, password: string) => {
            if(email == 'error@email.com') {
                return throwError(error);
            }
            return of({
                id: '1',
                email: email
            })
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([
                    LoginEffects
                ])
            ],
            providers: [
                provideMockActions(() => actions$)
            ]
        }).overrideProvider(AuthService, {useValue: authServiceMock});
        effects = TestBed.get(LoginEffects);
    });

    it('should recover password with existing email return success', (done) => {
        actions$ = of(recoverPassword({email: 'foo@bar.com'}));

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordSuccess());
            done();
        })
    });

    it('should recover password with none existing email return an error', (done) => {
        actions$ = of(recoverPassword({email: 'error@email.com'}));

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordFail({error}));
            done();
        })
    });

    it('should login success', (done) => {
        actions$ = of(login({email: 'foo@bar.com', password: 'foo'}));

        effects.login$.subscribe(newAction => {
            const user: User = {id: '1', email: 'foo@bar.com'}
            expect(newAction).toEqual(loginSuccess({user}));
            done();
        })
    });

    it('should login fail return an error', (done) => {
        actions$ = of(login({email: 'error@email.com', password: 'foo'}));

        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(loginFail({error}));
            done();
        })
    });
});
