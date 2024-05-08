import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, SidebarService, Header, TokenUser } from '../../index'

@Component({
  selector: 'app-siderbar-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './siderbar-item.component.html',
  styleUrl: './siderbar-item.component.scss',
})
export class SiderbarItemComponent implements OnInit {
  ngOnInit(): void {
    this.getListSidebar();
  }

  navbarItems!: Header[];
  private sidebarService = inject(SidebarService);
  private authService = inject(AuthService);
  private router = inject(Router);

  navigateToSomeRoute(route: string): void {
    this.router.navigate([route]);
  }


  getListSidebar() {
    const currentUser: TokenUser | any = this.authService.currentUser();

    this.sidebarService.listModule(currentUser.rol).subscribe({
      next: (navBarItems: Header[]) => {
        this.navbarItems = navBarItems;
        console.log('sidebar exitoso')

      },
      error: (error) => {
        console.log(error)
      }
    })

  }

}
