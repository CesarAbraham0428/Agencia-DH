// src/app/validators/must-match.validator.ts
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const formGroupTyped = formGroup as FormGroup;
    const control = formGroupTyped.controls[controlName];
    const matchingControl = formGroupTyped.controls[matchingControlName];

    if (!control || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }

    return null;
  };
}
