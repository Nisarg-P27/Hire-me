import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, of, delay, tap } from 'rxjs';
import { UserRole } from '../models/user-role';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);

  readonly currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  login(request: LoginRequest): Observable<User> {
    // Mock role resolution logic
    const role = request.email.includes('recruiter') ? UserRole.Recruiter : UserRole.Candidate;

    const mockUser: User = {
      id: crypto.randomUUID(),
      name: request.email.split('@')[0],
      email: request.email,
      role,
    };
    console.log('Mock login with:', mockUser);
    return of(mockUser).pipe(
      delay(800),
      tap((user) => this.currentUserSubject.next(user)),
    );
  }

  register(request: RegisterRequest): Observable<User> {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: request.name,
      email: request.email,
      role: request.role,
    };
    console.log('Mock register with:', newUser);
    return of(newUser).pipe(
      delay(800),
      tap((user) => this.currentUserSubject.next(user)),
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }
}
