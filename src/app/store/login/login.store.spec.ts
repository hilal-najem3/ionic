import { User } from '@app/models';
import { LoginState, login, loginFail, loginReducer, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './';
import { AppInitialState } from '@store/app-initial.state';

describe("Login State", () => {

    it('recoverPassword', () => {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, recoverPassword({email: 'foo@bar.com'}));

        expect(newState).toEqual(
            {
                ...initialState,
                error: null,
                isRecoveredPassword: false,
                isRecoveringPassword: true
            }
        );
    });

    it('recoverPasswordSuccess', () => {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, recoverPasswordSuccess());

        expect(newState).toEqual(
            {
                ...initialState,
                error: null,
                isRecoveredPassword: true,
                isRecoveringPassword: false
            }
        );
    });

    it('recoverPasswordFail', () => {
        const initialState: LoginState = AppInitialState.login;
        const error = {error: 'error'};
        const newState = loginReducer(initialState, recoverPasswordFail({error}));

        expect(newState).toEqual(
            {
                ...initialState,
                error: error,
                isRecoveredPassword: false,
                isRecoveringPassword: false
            }
        );
    });

    it('login', () => {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, login());

        expect(newState).toEqual(
            {
                ...initialState,
                error: null,
                isLoggedIn: false,
                isLoggingIn: true
            }
        );
    });

    it('loginSuccess', () => {
        const initialState: LoginState = {
            ...AppInitialState.login,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        };
        const user: User = {
            id: '1',
            email: 'user@example.com'
        };
        const newState = loginReducer(initialState, loginSuccess({user}));

        expect(newState).toEqual(
            {
                ...initialState,
                error: null,
                isLoggedIn: true,
                isLoggingIn: false
            }
        );
    });

    it('loginFail', () => {
        const initialState: LoginState = {
            ...AppInitialState.login,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        };
        const error = {error: 'error'};
        const newState = loginReducer(initialState, loginFail({error}));

        expect(newState).toEqual(
            {
                ...initialState,
                error: error,
                isLoggedIn: false,
                isLoggingIn: false
            }
        );
    });

});
