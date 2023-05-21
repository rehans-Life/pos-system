import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../Validators/match-password';
import { UniqueEmail } from '../Validators/unique-email';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { localStorageToken } from 'src/app/localstoragetoken';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  authForm = new FormGroup(
    {
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        [this.uniqueEmail.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    {
      validators: [this.matchPassword.validate],
    }
  );

  constructor(
    private auth: AuthService,
    private matchPassword: MatchPassword,
    private uniqueEmail: UniqueEmail,
    private router: Router,
    @Inject(localStorageToken) private localStorage: Storage
  ) {}

  showError() {
    const { password, confirmPassword } = this.authForm.controls;
    return (
      this.authForm.errors &&
      password.touched &&
      confirmPassword.touched &&
      password.dirty &&
      confirmPassword.dirty
    );
  }

  onSubmit() {
    const { email, password } = this.authForm.value;
    this.auth.signup({ email, password }).subscribe({
      next: (res) => {
        if (res) {
          this.localStorage.setItem('email', email);
          this.router.navigateByUrl('/products');
        } else {
          this.authForm.setErrors({ unexpectedError: true });
        }
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unexpectedError: true });
        }
      },
    });
  }
}
