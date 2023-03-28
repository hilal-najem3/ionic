/* eslint-disable @ngrx/no-typed-global-store */
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { LoginPage } from './login.page';

import { Observable, of, throwError } from 'rxjs';

import { imports, providers } from '@shared/imports';
import { Router } from '@angular/router';
import { AppRoutingModule } from '@app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { AuthService, StoreService, ToastService } from '@services/index';

import { AppState } from '@store/app-state.interface';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from '@store/login';
import { TranslateService } from '@ngx-translate/core';

import { User } from '@models/index';
import { environment } from '@environments/environment';

const fireBase = [
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideFirestore(() => getFirestore()),
];

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let store: Store<AppState>;
  let page: any;
  let toastController: ToastController;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        ...imports,
        ...fireBase,
        AppRoutingModule,
        ReactiveFormsModule
      ],
      providers: [
        ...providers,
        StoreService,
        AuthService,
        ToastService,
        ToastController,
        TranslateService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    toastController = TestBed.get(ToastController);
    authService = TestBed.get(AuthService);

    component = fixture.componentInstance;
    fixture.detectChanges();
    page = fixture.debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  });

  it('should recover password form when forgot password clicked', () => {
    spyOn(authService, 'recoverPassword').and.returnValue(new Observable(() => {}))
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    page.querySelector('#recoverPasswordButton').click();
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    });
  });

  it('should hide loading and show success message when has recovered password', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: 'foo@bar.com'}));
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('should hide loading and show error message when has recovered password failed', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: 'foo@bar.com'}));
    store.dispatch(recoverPasswordFail({error: true}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledTimes(2);
  });

  it('should show loading and start login when logging in', () => {
    fixture.detectChanges();
    component.form?.get('email')?.setValue('email@example.com');
    component.form?.get('password')?.setValue('V@lidP@ssWOrd');
    page.querySelector('#loginButton').click();
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    });
  });

  it('should hide loading and show home page after login', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    spyOn(router, 'navigate');
    
    fixture.detectChanges();
    store.dispatch(login({email: 'foo@bar.com', password: 'password'}));
    store.dispatch(loginSuccess({user: {id: '1', email: 'email@example.com'}}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeFalsy();
      expect(loginState.isLoggedIn).toBeTruthy();
    });
    expect(toastController.create).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should hide loading and show error when couldn\'t login', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    
    fixture.detectChanges();
    store.dispatch(login({email: 'foo@bar.com', password: 'password'}));
    store.dispatch(loginFail({error: {message: 'Login Failed'}}));
    
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeFalsy();
      expect(loginState.isLoggedIn).toBeFalsy();
    });
    expect(toastController.create).toHaveBeenCalledTimes(2);
  });
});
