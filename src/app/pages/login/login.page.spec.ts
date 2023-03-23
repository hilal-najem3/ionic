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

import { User } from '@models/index';
import { of, throwError } from 'rxjs';

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
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('should hide loading and show error message when has recovered password failed', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword());
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

  it('should hide loading and show home page after login', fakeAsync(() => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    spyOn(router, 'navigate');
    const newUser: User = {
      id: 1,
      email: 'email@example.com',
    };
    spyOn(authService, 'login').and.returnValue(of(newUser));
    
    fixture.detectChanges();
    component.form?.get('email')?.setValue('email@example.com');
    component.form?.get('password')?.setValue('V@lidP@ssWOrd');
    page.querySelector('#loginButton').click();
    tick(4000);
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeFalsy();
      expect(loginState.isLoggedIn).toBeTruthy();
    });
    expect(toastController.create).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should hide loading and show error when couldn\'t login', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(throwError({message: 'error'}));
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    
    fixture.detectChanges();
    component.form?.get('email')?.setValue('error@email.com');
    component.form?.get('password')?.setValue('V@lidP@ssWOrd');
    page.querySelector('#loginButton').click();
    tick(4000);
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeFalsy();
      expect(loginState.isLoggedIn).toBeFalsy();
    });
    expect(toastController.create).toHaveBeenCalledTimes(2);
  }));
});
