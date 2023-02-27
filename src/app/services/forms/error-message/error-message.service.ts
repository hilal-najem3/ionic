import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }

  shouldDisplay(field: FormGroup, error: string): boolean {

    if(field?.touched && field?.errors?.[error]) {
      return true;
    }

    return false;
  }
  
}
