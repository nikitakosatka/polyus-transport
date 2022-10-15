import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService, Credentials } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() readonly login = new EventEmitter<any>();
  readonly formGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });
  passwordHidden = true;
  loginInProgress = false;
  loginFailed = false;

  constructor(private readonly authService: AuthService) {
    this.formGroup.valueChanges.subscribe(() => (this.loginFailed = false));
  }

  tryLogin() {
    this.loginInProgress = true;
    this.authService
      .login(this.formGroup.value as Credentials)
      .subscribe(success => {
        this.loginInProgress = false;
        if (!success) {
          this.loginFailed = true;
        } else {
          this.login.emit();
        }
      });
  }
}
