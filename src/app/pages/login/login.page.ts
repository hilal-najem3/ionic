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

    this.loginStateSubscription = this.authService.loginState().subscribe((loginState: LoginState) => {
      this.onIsRecoveringPassword(loginState);
      this.onIsRecoveredPassword(loginState);
      this.onPasswordFailed(loginState);
    })
  }

  ngOnDestroy() {
    if(this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  login(): void {
    this.storeService.showLoading();
    setTimeout(() => {
      this.storeService.hideLoading();
      this.router.navigate(['/home']);
    }, 1000);
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

  private async onIsRecoveringPassword(loginState: LoginState): Promise<void> {
    if(loginState.isRecoveringPassword) {
      this.storeService.showLoading();
      this.authService.recoverPassword(this.email().value).subscribe(() => {
        this.authService.recoveredPasswordState();
      }, error => {
        this.authService.recoverPasswordFailed({error});
      });
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState): Promise<void> {
    if(loginState.isRecoveredPassword) {
      this.storeService.hideLoading();
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
      this.storeService.hideLoading();
      this.toastService.show({
        position: 'bottom',
        message: this.messages.recoverFailed,
        color: 'danger',
        duration: 5000
      });
      this.setForm();
    }
  }
}
