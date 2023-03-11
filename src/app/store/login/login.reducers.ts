/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { LoginState, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from '.';

const initialState: LoginState = {
    error: null,
    isLoggedIn: false,
    isLoggingIn: false,
    isRecoveredPassword: false,
    isRecoveringPassword: false
}

const reducer = createReducer(initialState,
    on(recoverPassword, (currentState: LoginState) => {
        return currentState;
    }),
    on(recoverPasswordSuccess, (currentState: LoginState) => {
        return currentState;
    }),
    on(recoverPasswordFail, (currentState: LoginState) => {
        return currentState;
    })
);

export function loginReducer(state: LoginState, action: any) {
    return reducer(state, action)
}