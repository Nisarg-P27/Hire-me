import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth-service';
import { UserRole } from '../../models/user-role';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = false;
  errorMessage: string | null = null;

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  submit(): void {
    if (this.form.invalid || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.form.getRawValue())
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          const user = response.user;
          if(user.role === UserRole.Recruiter) {
          this.router.navigate(['/recruiter/dashboard']);
        } else {
          this.router.navigate(['/jobs']);
        }
      },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err?.error?.message ?? 'Login Failed';
        }
      });
  }
}