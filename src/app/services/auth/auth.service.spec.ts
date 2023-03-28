import { TestBed } from '@angular/core/testing';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { InjectionToken } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Store, useValue: undefined },
        { provide: AngularFireAuth, useValue: undefined },
        { provide: InjectionToken, useValue: undefined }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
