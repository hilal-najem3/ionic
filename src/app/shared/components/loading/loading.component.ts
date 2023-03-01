/* eslint-disable @ngrx/no-typed-global-store */
/* eslint-disable @ngrx/prefer-selector-in-select */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppState } from '@store/app-state.interface';
import { LoadingState } from '@store/loading';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loadingState$: Observable<LoadingState> | undefined

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loadingState$ = this.store.select('loading');
  }

}
