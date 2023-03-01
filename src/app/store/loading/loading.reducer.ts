/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from "@ngrx/store";
import { show, hide, LoadingState } from ".";

const initialStat: LoadingState = {
    show: false
}

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