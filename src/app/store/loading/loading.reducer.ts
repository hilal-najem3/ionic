/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { show, hide, LoadingState } from '.';
import { AppInitialState } from '@store/app-initial.state';

const initialStat: LoadingState = AppInitialState.loading;

export const reducer = createReducer({},
    on(show, () => {
        return {show: true};
    }),
    on(hide, () => {
        return {show: false};
    })
);

export function loadingReducer(state: LoadingState, action: any) {
    return reducer(state, action);
}