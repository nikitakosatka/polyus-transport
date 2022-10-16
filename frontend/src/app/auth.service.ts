import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
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

export enum UserRole {
  Customer = 'customer',
  Dispatcher = 'dispatcher',
}

const USER_ID_STORAGE_KEY = 'user-id';
const AUTH_TOKEN_STORAGE_KEY = 'auth-token';
const ROLE_STORAGE_KEY = 'role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseUrl: string,
    private storage: LocalStorageService
  ) {}

  login(creds: Credentials, role: UserRole): Observable<boolean> {
    const formData = new FormData();
    formData.set('username', creds.username);
    formData.set('password', creds.password);
    return this.http
      .post<LoginResponse>(`${this.apiBaseUrl}/auth/${role}/login`, formData)
      .pipe(
        catchError(err => this.handleLoginError(err as HttpErrorResponse)),
        map((response: LoginResponse | null) => {
          if (response) {
            this.storage.setItem(USER_ID_STORAGE_KEY, response.id);
            this.storage.setItem(
              AUTH_TOKEN_STORAGE_KEY,
              response.tokenType + ' ' + response.accessToken
            );
            this.storage.setItem(ROLE_STORAGE_KEY, role);
            this.role$.next(role);
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
    this.storage.removeItem(USER_ID_STORAGE_KEY);
    this.storage.removeItem(ROLE_STORAGE_KEY);
    this.role$.next(null);
  }

  get token() {
    return this.storage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }

  get userId(): string | null {
    return this.storage.getItem(USER_ID_STORAGE_KEY);
  }

  readonly role$ = new BehaviorSubject<UserRole | null>(
    this.storage.getItem(ROLE_STORAGE_KEY) as UserRole
  );

  get isLoggedIn() {
    return Boolean(this.token);
  }
}
