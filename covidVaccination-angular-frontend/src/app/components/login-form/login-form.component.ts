import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() user = new EventEmitter<User>();
  @Input() showHeadline: boolean = true;
  @Input() btnLabel: string = "Einloggen";

  loginForm: FormGroup;
  currentUser: User;

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

    if (this.authService.isLoggedIn()) {
      this.currentUser = this.authService.getCurrentUser();
      this.user.emit(this.currentUser);
    }
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
        this.currentUser = this.authService.getCurrentUser();
        this.user.emit(this.currentUser);
      });
    } else {
      // error
    }
  }

}
