import { AppState } from "./app-state.interface";

export const AppInitialState: AppState = {
    loading: {
        show: false,
    },
    login: {
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        isRecoveredPassword: false,
        isRecoveringPassword: false
    }
}