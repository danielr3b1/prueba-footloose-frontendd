import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(){
    
  }

    ngOnInit(): void {
      this.MostrarUsers();
      this.MostrarMarca();
      this.MostrarModelo();
      this.MostrarTalla();
      this.MostrarProducto();
      this.MostrarColor();
      this.MostrarRol();
    }
    totalUsuers = 0;
    totalmarcas = 0;
    totalmodelos = 0;
    totaltallas = 0;
    totalproductos = 0;
    totalcolores = 0;
    totalroles = 0;

   private dashboardService = inject(DashboardService);

  async MostrarUsers() {
    await this.dashboardService.mostrarDatosUser().subscribe({
      next: (dashboard: any) => {
       this.totalUsuers = dashboard.total
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  
  async MostrarMarca() {
    await this.dashboardService.mostrarDatosMarca().subscribe({
      next: (dashboard: any) => {
       this.totalmarcas = dashboard.total
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async MostrarModelo() {
    await this.dashboardService.mostrarDatosModelo().subscribe({
      next: (dashboard: any) => {
       this.totalmodelos = dashboard.total
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async MostrarTalla() {
    await this.dashboardService.mostrarDatosTalla().subscribe({
      next: (dashboard: any) => {
       this.totaltallas = dashboard.total
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async MostrarProducto() {
    await this.dashboardService.mostrarDatosProductos().subscribe({
      next: (dashboard: any) => {
       this.totalproductos = dashboard.total
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async MostrarColor() {
    await this.dashboardService.mostrarDatosColor().subscribe({
      next: (dashboard: any) => {
       this.totalcolores = dashboard.total
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async MostrarRol() {
    await this.dashboardService.mostrarDatosRol().subscribe({
      next: (dashboard: any) => {
       this.totalroles = dashboard.total
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
