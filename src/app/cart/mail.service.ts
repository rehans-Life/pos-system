import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  url = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  sendEmail(email: string) {
    return this.http.post(`${this.url}/sendEmail`, { email }).subscribe();
  }
}
