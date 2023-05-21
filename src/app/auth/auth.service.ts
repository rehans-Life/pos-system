import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, of, switchMap, tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';

interface EmailResponse {
  exists: boolean;
}

interface Credentails {
  email: string;
  password: string;
}

interface SignupResponse {
  inserted: boolean;
}

interface SigninResponse extends EmailResponse {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiEndpoint;
  $signedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  checkEmail(email: string) {
    return this.http
      .post<EmailResponse>(`${this.url}/checkEmail`, { email })
      .pipe(
        map((res) => res.exists),
        filter((exists) => exists),
        switchMap(() => of({ emailNotUnique: true }))
      );
  }

  signup(credentials: Credentails) {
    return this.http
      .post<SignupResponse>(`${this.url}/signup`, credentials)
      .pipe(
        map((res) => res.inserted),
        tap((inserted) => this.$signedIn.next(inserted))
      );
  }

  signin(credentials: Credentails) {
    return this.http
      .post<SigninResponse>(`${this.url}/signin`, credentials)
      .pipe(
        map((res) => res.exists),
        tap((exists) => this.$signedIn.next(exists))
      );
  }
}
