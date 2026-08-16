import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, tap, catchError, map } from 'rxjs';
import { LoginRequest, LoginResponse, SessionResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly apiBaseUrl = '/intapi/Auth';

  // Signals for reactive state
  private _session = signal<SessionResponse | null>(null);
  private _isAuthenticated = signal<boolean>(false);
  private _isInitialized = signal<boolean>(false);

  readonly session = computed(() => this._session());
  readonly isAuthenticated = computed(() => this._isAuthenticated());
  readonly isInitialized = computed(() => this._isInitialized());

  /**
   * Checks if the user has an active session on the server.
   * Calls GET /intapi/Auth/checksession -> returns SessionResponse
   */
  checkSession(): Observable<boolean> {
    return this.http
      .get<SessionResponse>(`${this.apiBaseUrl}/checksession`, {
        withCredentials: true,
      })
      .pipe(
        map((response: SessionResponse) => {
          const authenticated = response?.isLoggedIn === true;
          this._session.set(response);
          this._isAuthenticated.set(authenticated);
          this._isInitialized.set(true);
          return authenticated;
        }),
        catchError((_error: HttpErrorResponse) => {
          this._session.set(null);
          this._isAuthenticated.set(false);
          this._isInitialized.set(true);
          return of(false);
        })
      );
  }

  /**
   * Logs in with login and password.
   * Calls POST /intapi/Auth/login -> returns LoginResponse
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiBaseUrl}/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this._isAuthenticated.set(true);
        })
      );
  }

  /**
   * Logs out user and resets authentication state.
   */
  logout(): void {
    this._session.set(null);
    this._isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
