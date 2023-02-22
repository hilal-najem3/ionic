import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { LoginPage } from './login.page';

import { imports, providers } from '@shared/imports';
import { Router } from '@angular/router';
import { AppRoutingModule } from '@app/app-routing.module';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        ...imports,
        AppRoutingModule
      ],
      providers: [
        ...providers,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to home page on login', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.login();
    tick(1500);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));
});
