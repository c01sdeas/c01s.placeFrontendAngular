import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const today = new Date();
    const birthDate = new Date(control.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    //   return age <= minAge ? { minAge: true } : null;
      if (age <= minAge) return { minAge: true };
      else if (age > 140) return { minAge: false };
      else null
    }

    return age < minAge ? { minAge: true } : null;
  };
}
