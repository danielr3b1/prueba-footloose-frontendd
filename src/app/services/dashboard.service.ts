import { Injectable, inject } from "@angular/core";
import { environment } from '../index';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Dashboard } from "../interface/datosDashboard.interface";
@Injectable({
    providedIn: 'root',
})

export class DashboardService {
    private readonly base_url: string = environment.BACKEND_URL;
    private readonly _http = inject(HttpClient);

    mostrarDatosUser(): Observable<Dashboard[]>{
       return this._http.get<Dashboard[]>(`${this.base_url}users/total`)
    }
    mostrarDatosMarca(): Observable<Dashboard[]>{
        return this._http.get<Dashboard[]>(`${this.base_url}marcas/total`)
     }
     mostrarDatosModelo(): Observable<Dashboard[]>{
        return this._http.get<Dashboard[]>(`${this.base_url}modelos/total`)
     }
     mostrarDatosColor(): Observable<Dashboard[]>{
        return this._http.get<Dashboard[]>(`${this.base_url}colores/total`)
     }
     mostrarDatosTalla(): Observable<Dashboard[]>{
        return this._http.get<Dashboard[]>(`${this.base_url}tallas/total`)
     }
     mostrarDatosRol(): Observable<Dashboard[]>{
        return this._http.get<Dashboard[]>(`${this.base_url}roles/total`)
     }
     mostrarDatosProductos(): Observable<Dashboard[]>{
        return this._http.get<Dashboard[]>(`${this.base_url}productos/total`)
     }
    
}