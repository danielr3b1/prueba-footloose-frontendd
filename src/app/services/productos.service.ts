import { Injectable, inject } from "@angular/core";
import { environment, Marca, Producto } from '../index';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class ProductoService {

    private readonly base_url: string = environment.BACKEND_URL;
    private readonly _http = inject(HttpClient);

    listProducto(): Observable<Producto[]> {
        return this._http.get<Producto[]>(`${this.base_url}productos/all`)
    }

    createProducto(formData: FormData): Observable<Producto> {
        return this._http.post<Producto>(`${this.base_url}productos/create`, formData)
    }

    updateProducto(id: string, formData: FormData) {
        return this._http.post<Producto>(`${this.base_url}productos/update/${id}`, formData)
    }

    deleteProducto(id: string): Observable<Producto> {
        return this._http.patch<Producto>(`${this.base_url}productos/state-active/${id}`, {})
    }

}