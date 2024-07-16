import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const loginGuard = () => {

  const router = inject(Router);

  if (typeof localStorage !== 'undefined' && localStorage.getItem('authToken')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
