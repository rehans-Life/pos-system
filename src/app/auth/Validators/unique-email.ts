import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UniqueEmail implements AsyncValidator {
  constructor(private auth: AuthService) {}

  validate = (
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
    const exists = this.auth.checkEmail(control.value);
    return exists;
  };
}
