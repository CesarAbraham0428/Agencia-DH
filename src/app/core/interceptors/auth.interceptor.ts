import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(clonedRequest);
  } else {
    return next(req);
  }
};
