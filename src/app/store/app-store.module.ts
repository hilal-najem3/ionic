import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading';
import { LoginEffects, loginReducer } from './login';
import { EffectsModule } from '@ngrx/effects';

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature('loading', loadingReducer),
    StoreModule.forFeature('login', loginReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
        LoginEffects
    ])
]