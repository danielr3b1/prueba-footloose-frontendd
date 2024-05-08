import { Injectable, inject } from "@angular/core";
import { environment, Marca, Producto } from '../index';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class UsuarioService {

    private readonly base_url: string = environment.BACKEND_URL;
    private readonly _http = inject(HttpClient);

    listUsuario(): Observable<Producto[]> {
        return this._http.get<Producto[]>(`${this.base_url}users/all`)
    }

    createUsuario(formData: FormData): Observable<Producto> {
        return this._http.post<Producto>(`${this.base_url}users/create`, formData)
    }

    updateUsuario(id: string, formData: FormData) {
        return this._http.post<Producto>(`${this.base_url}users/update/${id}`, formData)
    }

    deleteUsuario(id: string): Observable<Producto> {
        return this._http.patch<Producto>(`${this.base_url}users/state-active/${id}`, {})
    }

}