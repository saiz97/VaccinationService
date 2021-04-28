import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() user = new EventEmitter<User>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    const val = this.loginForm.value;
    console.log("Logged In...", val.email, val.password);

    if(val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe(result => {
        this.authService.setSessionStorage(result.access_token);
        const user: User = this.authService.decodeToken();
        this.user.emit(user);
      });
    } else {
      // error
    }
  }

}
