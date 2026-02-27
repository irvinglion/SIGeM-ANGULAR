import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserMode, UserService } from '../services/user.service';

export const roleGuard: CanActivateFn = (route) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const allowedRoles = route.data?.['roles'] as UserMode[] | undefined;
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  const currentMode = userService.currentMode;
  if (currentMode === 'admin_geral' || allowedRoles.includes(currentMode)) {
    return true;
  }

  return router.createUrlTree(['/']);
};
