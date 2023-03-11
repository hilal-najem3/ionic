import { createAction } from '@ngrx/store';
import { LoadingState, hide, loadingReducer, show } from './';
import { AppInitialState } from '@store/app-initial.state';

describe('Loading store', () => {

    it('show', () => {
        const initialState: LoadingState = AppInitialState.loading;
        const newState = loadingReducer(initialState, show());

        expect(newState).toEqual({show: true});
    });

    it('hide', () => {
        const initialState: LoadingState = {show: true};
        const newState = loadingReducer(initialState, hide());

        expect(newState).toEqual({show: false});
    });

    it('should keep state if action is unknown', () => {
        const initialState: LoadingState = {show: true};
        // eslint-disable-next-line @ngrx/good-action-hygiene
        const action = createAction('UNKNOWN');
        const newState = loadingReducer(initialState, action);

        expect(newState).toEqual({show: true});
    });
});