import { Injectable, inject } from "@angular/core";
import { environment, Talla } from '../index';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class TallaService {

    private readonly base_url: string = environment.BACKEND_URL;
    private readonly _http = inject(HttpClient);

    listTalla(): Observable<Talla[]> {
        return this._http.get<Talla[]>(`${this.base_url}tallas/all`)
    }

    createTalla(nombre: string): Observable<Talla> {
        return this._http.post<Talla>(`${this.base_url}tallas/create`, { nombreTalla: nombre })
    }

    updateTalla(id: string, nombre: string) {
        return this._http.patch<Talla>(`${this.base_url}tallas/update/${id}`, { nombreTalla: nombre })
    }

    deleteTalla(id: string): Observable<Talla> {
        return this._http.patch<Talla>(`${this.base_url}tallas/state-active/${id}`, {})
    }

}