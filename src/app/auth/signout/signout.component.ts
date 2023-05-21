import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css'],
})
export class SignoutComponent {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.navigateByUrl('/').then(() => {
      this.auth.$signedIn.next(false);
    });
  }
}
