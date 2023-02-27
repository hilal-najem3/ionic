import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginPageForm } from './form/login.page.form';
import { ErrorMessageService } from '@app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    protected errorMessageService: ErrorMessageService
  ) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  login(): void {
    setTimeout(() => {
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
}
