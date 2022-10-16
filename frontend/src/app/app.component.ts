import { Component } from '@angular/core';
import { AuthService, UserRole } from './auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  readonly sidebarVisible$ = this.router.events.pipe(
    filter((val): val is NavigationEnd => val instanceof NavigationEnd),
    map((val: NavigationEnd) => val.url !== '/login')
  );
  userRole: UserRole | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    authService.role$.subscribe(role => {
      this.userRole = role;
    });
  }

  logOut() {
    this.authService.logout();
    window.location.reload();
  }
}
