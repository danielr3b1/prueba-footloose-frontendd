import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AuthService } from '../../index';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{
  private authService = inject(AuthService);
  constructor(){
    
  }
  ngOnInit(){
    //this.getCurrentUser();
  }
  
  private getCurrentUser(){
    if (typeof window !== 'undefined') {
      //this.authService.setCurrentUserToken();
    }
  }
}
