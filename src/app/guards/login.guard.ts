import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);
  const router = inject(Router);


  if (authService.isLogued()){
    return true;
  }
  // let token = localStorage.getItem('token');
  // if (token != null) {
  //   let jwt: any;
  //   jwt = jwt_decode(token);

  //   let fechaExpira = new Date(jwt.exp * 1000);
  //   let currentDate = new Date();

  //   if (fechaExpira  > currentDate) return true;
  // }


  authService.logout();
  router.navigateByUrl('/auth/login');
  return false;
};
