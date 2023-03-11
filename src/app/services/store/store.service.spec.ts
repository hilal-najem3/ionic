import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { Store } from '@ngrx/store';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreService,
        { provide: Store, useValue: undefined }
      ]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
