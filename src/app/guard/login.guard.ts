import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      // El usuario está autenticado, permite el acceso
      return true;
    } else {
      // El usuario no está autenticado, redirige al componente de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}


