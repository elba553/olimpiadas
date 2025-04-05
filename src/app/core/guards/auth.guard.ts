import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (
    authService.isAuthenticated() ||
    ['expedientes-archivados', 'expedientes-por-archivar'].includes(
      route.routeConfig?.path ?? ''
    )
  ) {
    return true;
  } else {
    router.navigate(['/login1'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};

export const isAdmin: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (
    !authService.isAuthenticated() || authService.getPerfil() != 'ADMINISTRADOR'
  ) {
    router.navigate(['/login1'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  return true;
};

export const isClient: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (
    !authService.isAuthenticated() || authService.getPerfil() != 'USUARIO'
  ) {
    router.navigate(['/login1'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  return true;
};
