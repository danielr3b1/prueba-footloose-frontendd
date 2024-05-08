import { Injectable, inject } from "@angular/core";
import { Color, environment } from '../index';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class ColoresService {

    private readonly base_url: string = environment.BACKEND_URL;
    private readonly _http = inject(HttpClient);

    listColores(): Observable<Color[]> {
        return this._http.get<Color[]>(`${this.base_url}colores/all`)
    }

    createColor(nombre: string): Observable<Color> {
        return this._http.post<Color>(`${this.base_url}colores/create`, { nombreColor: nombre })
    }

    updateColor(id: string, nombre: string) {
        return this._http.patch<Color>(`${this.base_url}colores/update/${id}`, { nombreColor: nombre })
    }

    deleteColor(id: string): Observable<Color> {
        return this._http.patch<Color>(`${this.base_url}colores/state-active/${id}`, {})
    }

}