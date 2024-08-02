import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard = () => {
  const router = inject(Router);

  if (typeof localStorage !== 'undefined' && localStorage.getItem('authToken') && localStorage.getItem('userRole') == 'admin') {
    return true;
  } else {
    router.navigate(['/inicio']);
    return false;
  }
};
