import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { LoginPageForm } from './form/login.page.form';
import { AuthService, ErrorMessageService, StoreService, ToastService } from '@services/index';

import { LoginState } from '@store/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form!: FormGroup;
  messages: any;
  loginStateSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    protected errorMessageService: ErrorMessageService,
    private storeService: StoreService,
    private authService: AuthService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {
    this.translateService.get('login').subscribe((messages: any) => {
      this.messages = messages;
    });
  }
  

  ngOnInit() {
    this.setForm();

    this.loginStateSubscription = this.authService.loginState()
    .subscribe((loginState: LoginState) => {
      this.onIsRecoveredPassword(loginState);
      this.onPasswordFailed(loginState);

      this.onIsLoggedIn(loginState);
      this.onLoginFail(loginState);

      this.toggleLoading(loginState);
    })
  }

  ngOnDestroy() {
    if(this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  login(): void {
    this.authService.activateLoginState();
  }

  email(): FormGroup {
    return this.form.get('email') as FormGroup;
  }

  password(): FormGroup {
    return this.form.get('password') as FormGroup;
  }

  error(field: FormGroup, errorName: string): boolean {
    return this.errorMessageService.shouldDisplay(field, errorName)
  }

  forgot(): void {
    this.authService.recoveringPasswordState();
  }

  private setForm(): void {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }


  private async onIsRecoveredPassword(loginState: LoginState): Promise<void> {
    if(loginState.isRecoveredPassword) {
      this.toastService.show({
        position: 'bottom',
        message: this.messages.recoverSent,
        color: 'primary',
        duration: 5000
      });
      this.setForm();
    }
  }

  private async onPasswordFailed(loginState: LoginState): Promise<void> {
    if(loginState.error) {
      this.toastService.show({
        position: 'bottom',
        message: this.messages.recoverFailed,
        color: 'danger',
        duration: 5000
      });
      this.setForm();
    }
  }

  private async onIsLoggedIn(loginState: LoginState): Promise<void> {
    if(loginState.isLoggedIn) {
      this.toastService.show({
        position: 'bottom',
        message: this.messages.loginSuccess,
        color: 'primary',
        duration: 5000
      });
      this.router.navigate(['/home']);
    }
  }

  private async onLoginFail(loginState: LoginState): Promise<void> {
    if(loginState.error) {
      this.toastService.show({
        position: 'bottom',
        message: this.getErrorMessage(loginState.error.code),
        color: 'danger',
        duration: 5000
      });
      this.setForm();
    }
  }

  private toggleLoading(loginState: LoginState): void {
    loginState.isLoggingIn || loginState.isRecoveringPassword ? 
    this.storeService.showLoading(): this.storeService.hideLoading();
  }

  private getErrorMessage(code: string): string {
    const baseMessages = {
      general: 'Login failed.',
      invalidEmail: 'Email address not found.'
    };
    const messages = this.messages? 
      this.messages.loginFail ? 
        this.messages.loginFail
        :
        baseMessages
      :
      baseMessages
    let errorMessage: string = messages.general ? messages.general : baseMessages.general;

    switch(code) {
      case 'auth/invalid-email': {
        errorMessage = messages.invalidEmail ? messages.invalidEmail : baseMessages.invalidEmail;
        break;
      }
      default: {
        break;
      }
    }

    return errorMessage;
  }
}
