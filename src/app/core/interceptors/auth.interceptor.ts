import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    console.log('Cloned Request Headers:', clonedRequest.headers.get('Authorization')); // Log para verificar el encabezado
    return next(clonedRequest);
  } else {
    console.log('No auth token found in localStorage'); // Log para verificar que el token está presente
    return next(req);
  }
};
