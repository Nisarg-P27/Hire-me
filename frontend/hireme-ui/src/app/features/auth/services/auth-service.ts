import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, of, delay, tap } from 'rxjs';
import { UserRole } from '../models/user-role';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'hireme_current_user';

  private readonly currentUserSubject = new BehaviorSubject<User | null>(
    this.loadUsersFromStorage(),
  );
  readonly currentUser$ = this.currentUserSubject.asObservable();

  router = inject(Router);

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  login(request: LoginRequest): Observable<User> {
    // Mock role resolution logic
    const role = request.email.includes('recruiter') ? UserRole.Recruiter : UserRole.Candidate;
    const id = role === UserRole.Recruiter ? '123' : crypto.randomUUID();
    const mockUser: User = {
      id,
      name: request.email.split('@')[0],
      email: request.email,
      role,
    };
    // console.log('Mock login with:', mockUser);
    this.saveUsersToStorage(mockUser);
    return of(mockUser).pipe(
      delay(800),
      tap((user) => this.currentUserSubject.next(user)),
    );
  }

  register(request: RegisterRequest): Observable<User> {
    const newUser: User = {
      id: request.role === UserRole.Recruiter ? 'recruiter-123' : crypto.randomUUID(),
      name: request.name,
      email: request.email,
      role: request.role,
    };
    console.log('Mock register with:', newUser);
    this.saveUsersToStorage(newUser);
    return of(newUser).pipe(
      delay(800),
      tap((user) => this.currentUserSubject.next(user)),
    );
  }

  logout(): Observable<void> {
    this.currentUserSubject.next(null);
    this.saveUsersToStorage(null);
    this.router.navigate(['auth/login']);
    return of(void 0)
  }

  private loadUsersFromStorage(): User | null {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }

  private saveUsersToStorage(user: User | null): void {
    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}
