import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../index';
import { Header } from '../components/siderbar-item/interface/header.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  
  private readonly baseUrl: string = environment.BACKEND_URL;
  private readonly _http = inject(HttpClient);

  listModule(idUser: number): Observable<Header[]> {

    return this._http.get<Header[]>(`${this.baseUrl}modulos/user/${idUser}`);
  }

}