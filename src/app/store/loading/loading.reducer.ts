/* eslint-disable @ngrx/on-function-explicit-return-type */
import { Action, createReducer, on } from "@ngrx/store";
import { show, hide } from ".";

export const reducer = createReducer({},
    on(show, () => {
        return {};
    }),
    on(hide, () => {
        return {}
    })
);

export function loadingReducer(state: any, action: Action) {
    return reducer(state, action);
}