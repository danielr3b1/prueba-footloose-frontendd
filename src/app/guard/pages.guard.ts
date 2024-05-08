import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class PagesGuard implements CanActivate {
  
    constructor(private router: Router) {}
  
    canActivate(): boolean {
      if (!localStorage.getItem('token')) {
        // El usuario no está autenticado, permite el acceso
        return true;
      } else {
        // El usuario está autenticado, redirige a alguna otra página, por ejemplo, el dashboard
        this.router.navigate(['/dashboard']);
        return false;
      }
    }
  }