import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface IErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValidationsService {
  constructor() {}

  noSteven(control: FormControl): { [s: string]: boolean } | null {
    if (control.value?.toLowerCase() === 'steven') {
      return {
        steven: true,
      };
    }

    return null;
  }

  equalPassword(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[password1];
      const pass2Control = formGroup.controls[password2];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEqual: true });
      }
    };
  }

  userNotFound(
    control: FormControl
  ): Promise<IErrorValidate | null> | Observable<IErrorValidate | null> {
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'steven') {
          resolve({ exist: true });
        } else {
          resolve({ exist: false });
        }
      }, 3500);
    });
  }
}
