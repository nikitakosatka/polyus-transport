import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { API_BASE_URL } from './api-config.module';

export interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  tokenType: string;
  id: string;
}

const USER_ID_STORAGE_KEY = 'user-id';
const AUTH_TOKEN_STORAGE_KEY = 'auth-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseUrl: string,
    private storage: LocalStorageService
  ) {}

  login(creds: Credentials): Observable<boolean> {
    const formData = new FormData();
    formData.set('username', creds.username);
    formData.set('password', creds.password);
    return this.http
      .post<LoginResponse>(`${this.apiBaseUrl}/auth/customer/login`, formData)
      .pipe(
        catchError(err => this.handleLoginError(err as HttpErrorResponse)),
        map((response: LoginResponse | null) => {
          if (response) {
            this.storage.setItem(USER_ID_STORAGE_KEY, response.id);
            this.storage.setItem(
              AUTH_TOKEN_STORAGE_KEY,
              response.tokenType + ' ' + response.accessToken
            );
          }
          return Boolean(response);
        })
      );
  }

  private handleLoginError(error: HttpErrorResponse): Observable<null> {
    return of(null);
  }

  logout() {
    this.storage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }

  get token() {
    return this.storage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }

  get userId(): string | null {
    return this.storage.getItem(USER_ID_STORAGE_KEY);
  }

  get isLoggedIn() {
    return Boolean(this.token);
  }
}
