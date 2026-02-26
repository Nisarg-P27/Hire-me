import { Component, EventEmitter, inject, Output } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../features/auth/services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  CommonModule,
RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);

  @Output() menuToggle = new EventEmitter<void>();
  toggleMenu() {
    this.menuToggle.emit();
  }

  readonly currentUser$ = this.authService.currentUser$;

  handleLogout() {
    this.authService.logout().subscribe(() => {
      console.log('User logged out successfully');
    this.snackBar.open('Logged out successfully!', 'Close', { duration: 3000 });
  })
  }
}
