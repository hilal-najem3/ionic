import { LoginState, loginReducer, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './';
import { AppInitialState } from '@store/app-initial.state';

describe("Login State", () => {

    it('recoverPassword', () => {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, recoverPassword());

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

});
