import { Injectable, inject } from "@angular/core";
import { environment, Marca } from '../index';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class MarcaService {

    private readonly base_url: string = environment.BACKEND_URL;
    private readonly _http = inject(HttpClient);

    listMarca(): Observable<Marca[]> {
        return this._http.get<Marca[]>(`${this.base_url}marcas/all`)
    }

    createMarca(nombre: string): Observable<Marca> {
        return this._http.post<Marca>(`${this.base_url}marcas/create`, { nombreMarca: nombre })
    }

    updateMarca(id: string, nombre: string) {
        return this._http.patch<Marca>(`${this.base_url}marcas/update/${id}`, { nombreMarca: nombre })
    }

    deleteMarca(id: string): Observable<Marca> {
        return this._http.patch<Marca>(`${this.base_url}marcas/state-active/${id}`, {})
    }

}