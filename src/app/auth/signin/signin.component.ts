import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { localStorageToken } from 'src/app/localstoragetoken';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(localStorageToken) private localStorage: Storage
  ) {}

  showErrors() {
    return this.authForm.errors;
  }

  onSubmit() {
    const { email, password } = this.authForm.value;
    this.auth.signin({ email, password }).subscribe({
      next: (res) => {
        if (res) {
          this.localStorage.setItem('email', email);
          this.router.navigateByUrl('/products');
        } else {
          this.authForm.setErrors({ notFound: true });
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
