import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-frontend';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAdmin();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    return this.authService.isLoggedIn() ? "Logout" : "Login";
  }
}
