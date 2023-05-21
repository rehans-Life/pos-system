import { Injectable } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canMatch: CanMatchFn = () => {
    return this.auth.$signedIn.pipe(
      take(1),
      tap((res) => {
        if (!res) {
          this.router.navigateByUrl('/');
        }
      })
    );
  };
}
