import { LoadingState } from "./loading";
import { LoginState } from "./login";

export interface AppState {
    loading: LoadingState;
    login: LoginState;
}