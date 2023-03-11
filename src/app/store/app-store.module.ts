import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading';
import { loginReducer } from './login';

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature('loading', loadingReducer),
    StoreModule.forFeature('login', loginReducer),
]