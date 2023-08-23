import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const loguedGuard: CanActivateFn = (route, state) => {
  const authService = inject( UserService );
  const router = inject( Router );


  if (authService.isLogued()){
    router.navigateByUrl('/pages/page1');
  }

  return true;
};
