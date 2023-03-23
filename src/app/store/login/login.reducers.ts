/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { LoginState, login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from '.';
import { AppInitialState } from '@store/app-initial.state';

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    on(recoverPassword, (currentState: LoginState) => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        };
    }),
    on(recoverPasswordSuccess, (currentState: LoginState) => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        };
    }),
    on(recoverPasswordFail, (currentState: LoginState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        };
    }),
    on(login, (currentState: LoginState, action) => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        };
    }),
    on(loginSuccess, (currentState: LoginState, action) => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: true,
            isLoggingIn: false
        };
    }),
    on(loginFail, (currentState: LoginState, action) => {
        return {
            ...currentState,
            error: action.error,
            isLoggedIn: false,
            isLoggingIn: false
        };
    }),
);

export function loginReducer(state: LoginState, action: any) {
    return reducer(state, action)
}