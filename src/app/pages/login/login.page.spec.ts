/* eslint-disable @ngrx/no-typed-global-store */
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { LoginPage } from './login.page';

import { imports, providers } from '@shared/imports';
import { Router } from '@angular/router';
import { AppRoutingModule } from '@app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService, StoreService, ToastService } from '@services/index';

import { AppState } from '@store/app-state.interface';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from '@store/login';
import { TranslateService } from '@ngx-translate/core';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let store: Store<AppState>;
  let page: any;
  let toastController: ToastController; 

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        ...imports,
        AppRoutingModule,
        ReactiveFormsModule
      ],
      providers: [
        ...providers,
        StoreService,
        AuthService,
        ToastService,
        ToastController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    toastController = TestBed.get(ToastController);

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

  it('should go to home page on login', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.login();
    tick(2000);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should show forgot password form when forgot password clicked', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    page.querySelector('#recoverPasswordButton').click();
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    });
  });

  it('should show loading when recovering a password', () => {
    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    });
  });

  it('should hide loading and show success message when has recovered password', () => {
    // spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    // expect(toastController.create()).toHaveBeenCalledTimes(1);
  });

  it('should hide loading and show error message when has recovered password failed', () => {
    // spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({error: true}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    // expect(toastController.create()).toHaveBeenCalledTimes(1);
  });
});
