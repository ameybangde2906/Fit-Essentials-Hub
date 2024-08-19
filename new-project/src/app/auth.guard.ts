import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);

  let isLogged=localStorage.getItem('user_id');
  if(isLogged == null){
    _router.navigate(["login"])
    return false;
  }
  return true;

};
export const adminAuthGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);

  let isAdminLogged=localStorage.getItem('Admin_id');
  if(isAdminLogged == null){
    _router.navigate(["admin-login"])
    return false;
  }
  return true;

};
export const loginAuthGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);

  let isLogged=localStorage.getItem('Admin_id') || localStorage.getItem('user_id')
  if(isLogged){
    _router.navigate([""])
    return false;
  }
  return true;

};

