import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading';

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature('loading', loadingReducer),
]