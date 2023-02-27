import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorMessageComponent } from './error-message.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessageComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when control is touched and error is present', () => {
    component.field = new FormGroup({ anyField: new FormControl() });

    component.field.markAsTouched();
    component.field.setErrors({anyError: true});
    component.error = 'anyError';

    console.log(1, component.shouldDisplay());
    expect(component.shouldDisplay()).toBeTruthy();
  });

  it('should hide error message when control is not touched', () => {
    component.field = new FormGroup({ anyField: new FormControl() });

    component.field.setErrors({anyError: true});
    component.error = 'anyError';

    console.log(2, component.shouldDisplay());
    expect(component.shouldDisplay()).toBeFalsy();
  });

  it('should hide error message when control is touched but error not present', () => {
    component.field = new FormGroup({ anyField: new FormControl() });

    component.field.markAsTouched();
    component.error = 'anyError';

    console.log(3, component.shouldDisplay());

    expect(component.shouldDisplay()).toBeFalsy();
  });

  it('should hide error message when control is touched but error is different error', () => {
    component.field = new FormGroup({ anyField: new FormControl() });

    component.field.markAsTouched();
    component.field.setErrors({anyError: true});
    component.error = 'anotherError';

    console.log(4, component.shouldDisplay());

    expect(component.shouldDisplay()).toBeFalsy();
  });
});
