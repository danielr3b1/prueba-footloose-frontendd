import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RolesComponent } from './pages/roles/roles.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { ModelosComponent } from './pages/modelos/modelos.component';
import { ColoresComponent } from './pages/colores/colores.component';
import { TallasComponent } from './pages/tallas/tallas.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { LoginGuard } from './guard/login.guard';
import { PagesGuard } from './guard/pages.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [PagesGuard]
    },
    {
        path: "",
        component: LayoutComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: "dashboard",
                component: DashboardComponent,
                  canActivate: [LoginGuard]
            },
            {
                path: "productos",
                component: ProductosComponent,
                canActivate: [LoginGuard]
            },
            {
                path: "usuarios",
                component: UsuariosComponent,
                canActivate: [LoginGuard]
            },
            {
                path: "roles",
                component: RolesComponent,
                canActivate: [LoginGuard]
            },
            {
                path: "marcas",
                component: MarcasComponent,
                canActivate: [LoginGuard]
            },
            {
                path: "modelos",
                component: ModelosComponent,
                canActivate: [LoginGuard]
            },
            {
                path: "colores",
                component: ColoresComponent,
                canActivate: [LoginGuard]
            },
            {
                path: "tallas",
                component: TallasComponent,
                canActivate: [LoginGuard]
            },
        ]
    }

];
