import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const questGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window === 'undefined') {
    return true;
  }

  const isLoggedIn = !!localStorage.getItem('token');

  if (isLoggedIn) {
    router.navigate(['/dashboard/home']);
    return false;
  }

  return true;
};
