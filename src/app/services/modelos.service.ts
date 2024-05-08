import { Injectable, inject } from "@angular/core";
import { environment, Modelo } from '../index';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class ModelosService {

    private readonly base_url: string = environment.BACKEND_URL;
    private readonly _http = inject(HttpClient);

    listModelos(): Observable<Modelo[]> {
        return this._http.get<Modelo[]>(`${this.base_url}modelos/all`)
    }

    createModelo(nombre: string): Observable<Modelo> {
        return this._http.post<Modelo>(`${this.base_url}modelos/create`, { nombreModelo: nombre })
    }

    updateModelo(id: string, nombre: string) {
        return this._http.patch<Modelo>(`${this.base_url}modelos/update/${id}`, { nombreModelo: nombre })
    }

    deleteModelo(id: string): Observable<Modelo> {
        return this._http.patch<Modelo>(`${this.base_url}modelos/state-active/${id}`, {})
    }

}