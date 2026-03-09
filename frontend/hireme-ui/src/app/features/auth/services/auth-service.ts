import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, of, delay, tap } from 'rxjs';
import { UserRole } from '../models/user-role';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly API_BASE = 'http://localhost:8080/api/auth';

  private readonly USER_KEY = 'hireme_user';
  private readonly TOKEN_KEY = 'hireme_token';
  private readonly currentUserSubject = new BehaviorSubject<User | null>(
    this.loadUserFromStorage(),
  );
  readonly currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    const response = this.http.post<LoginResponse>(`${this.API_BASE}/login`, request);
    response.subscribe((res) => {
      console.log('Login response:', res.token);
      console.log('Login response user:', res.user);
    });
    return response.pipe(
      tap((res) => this.persistSession(res)),
    );
  }

  register(request: RegisterRequest): Observable<LoginResponse> {
    const response = this.http.post<LoginResponse>(`${this.API_BASE}/register`, request);
    return response.pipe(
      tap((res) => this.persistSession(res)),
    );
  }

  logout(): Observable<void> {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['auth/login']);
    return of(void 0)
  }

  private persistSession(response: LoginResponse): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    localStorage.setItem(this.TOKEN_KEY, response.token);
    this.currentUserSubject.next(response.user);
  }

  private loadUserFromStorage(): User | null {
    const stored = localStorage.getItem(this.USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
