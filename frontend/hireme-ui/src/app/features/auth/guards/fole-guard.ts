import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../models/user-role';
import { AuthService } from '../services/auth-service';


export function RoleGuard(requiredRole: UserRole): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.currentUser;

    if (!user) {
      return router.createUrlTree(['/login']);
    }

    if (user.role !== requiredRole) {
      return router.createUrlTree(['/jobs']);
    }

    return true;
  };
}
