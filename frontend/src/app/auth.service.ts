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
  access_token: string;
  token_type: string;
}

const AUTH_TOKEN_STORAGE_KEY = 'auth-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseUrl: string,
    private storage: LocalStorageService
  ) {}

  login(creds: Credentials): Observable<boolean> {
    return this.http.post<LoginResponse>('/api/login', creds).pipe(
      catchError(err => this.handleLoginError(err as HttpErrorResponse)),
      map(response => {
        if (response) {
          this.storage.setItem(
            AUTH_TOKEN_STORAGE_KEY,
            response.token_type + ' ' + response.access_token
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

  get isLoggedIn() {
    return Boolean(this.token);
  }
}
