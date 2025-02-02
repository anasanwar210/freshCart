import { CanDeactivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const guestGuardGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  let _AuthService: AuthService = inject(AuthService);
  let _Router: Router = inject(Router);

  if (_AuthService.userData.getValue() !== null) {
    _Router.navigate(['home']);
    return false;
  }
  return true;
};
