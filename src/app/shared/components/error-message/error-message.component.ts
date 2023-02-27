import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {

  @Input()
  message!: string;
  @Input()
  field!: FormGroup;
  @Input()
  error!: string;
  @Input()
  display: boolean | null = null;

  
  constructor() { }

  shouldDisplay(): boolean {
    if(!this.message) {
      return false;
    }

    if(this.display != null) {
      return this.display;
    }

    if(this.field?.touched && this.field?.errors?.[this.error]) {
      return true;
    }

    return false;
  }

}
