import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value !== confirmPassword?.value ? { noMatchError: true } : null;
};
