import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = sessionStorage.getItem('userId');
  console.log(userId);
  if (userId) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
