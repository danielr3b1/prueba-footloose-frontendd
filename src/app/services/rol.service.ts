import { Injectable, inject } from "@angular/core";
import { Header, Roles, environment } from '../index';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Item } from "../components/siderbar-item/interface/item.interface";

@Injectable({
    providedIn: 'root',
})

export class RolService {

    private readonly base_url: string = environment.BACKEND_URL;
    private readonly _http = inject(HttpClient);

    listRoles(): Observable<Roles[]> {
        return this._http.get<Roles[]>(`${this.base_url}roles/all`);
    }

    listPermisos(): Observable<Header[]>{
        return this._http.get<Header[]>(`${this.base_url}roles/permisos/all`);
    }

    listModuleHeaderById(idUser: number): Observable<Header[]> {
        return this._http.get<Header[]>(`${this.base_url}roles/header/${idUser}`);
    }

    listModuleChildById(idUser: number): Observable<Item[]> {

        return this._http.get<Item[]>(`${this.base_url}roles/child/${idUser}`);
    }

    listModuleHeader(): Observable<Header[]> {

        return this._http.get<Header[]>(`${this.base_url}roles/header`);
    }
    
    listModuleChild(): Observable<Item[]> {

        return this._http.get<Item[]>(`${this.base_url}roles/child`);
    }

    createRol(roles: any): Observable<Header[]> {
        return this._http.post<Header[]>(`${this.base_url}roles/create`, { nombreModelo: roles })
    }

    updateRol(roles: any, id: number): Observable<Header[]> {
        return this._http.post<Header[]>(`${this.base_url}roles/update/${id}`, { nombreModelo: roles })
    }

    deleteRoles(id: string): Observable<Roles> {
        return this._http.patch<Roles>(`${this.base_url}roles/state-active/${id}`, {})
    }
    
}