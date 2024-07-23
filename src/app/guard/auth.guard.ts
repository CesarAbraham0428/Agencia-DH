import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const userGuard = () => {

  const router = inject(Router);
  //se puso usuario
  if (typeof localStorage !== 'undefined' && localStorage.getItem('authToken') && localStorage.getItem('userRole') == 'usuario') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
