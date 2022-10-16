import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService, Credentials, UserRole } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output() readonly login = new EventEmitter<any>();
  readonly formGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    role: new FormControl(UserRole.Customer),
  });
  passwordHidden = true;
  loginInProgress = false;
  loginFailed = false;

  constructor(private readonly authService: AuthService) {
    this.formGroup.valueChanges.subscribe(() => (this.loginFailed = false));
  }

  tryLogin() {
    this.loginInProgress = true;
    this.formGroup.disable();
    this.authService
      .login(this.formGroup.value as Credentials, this.formGroup.value.role!)
      .subscribe(success => {
        this.loginInProgress = false;
        this.formGroup.enable();
        if (!success) {
          this.loginFailed = true;
        } else {
          this.login.emit();
        }
      });
  }

  onPasswordFieldKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.tryLogin();
    }
  }
}
