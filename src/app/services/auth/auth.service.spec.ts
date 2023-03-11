import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Store, useValue: undefined }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
