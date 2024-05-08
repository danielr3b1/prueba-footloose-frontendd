import { Component, inject } from '@angular/core';
import { vTexto, vImage, TokenUser, AuthService, environment } from '../../index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public varText = vTexto.header;
  private router = inject( Router );
  private authService = inject( AuthService );
  public URL_BASE = environment.BACKEND_URL+'users/profile-image/';

  public user = '';
  public img = '';

  constructor(){
    //const currentUser: TokenUser | any = this.authService.currentUser();
    this.user = localStorage.getItem('user')
    this.img = localStorage.getItem('img')
    this.img = this.URL_BASE+this.img;
    console.log(this.img )
  }


  navigateToSomeRoute(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
