import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private role: UserRole | null = null;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    authService.role$.subscribe(role => {
      this.role = role;
    });
  }

  handleLogin() {
    this.router.navigate([this.role]);
  }
}
