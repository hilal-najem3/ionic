/* eslint-disable @ngrx/prefer-selector-in-select */
/* eslint-disable @ngrx/no-typed-global-store */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@store/app-state.interface';
import { hide, show } from '@store/loading';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private store: Store<AppState>
  ) { }

  showLoading(): void {
    this.store.dispatch(show());
  }

  hideLoading(): void {
    this.store.dispatch(hide());
  }
}
