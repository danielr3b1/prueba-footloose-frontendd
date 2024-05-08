import { Injectable, inject, signal, computed } from '@angular/core';
import {environment, LoginRequest, LoginResponse, User, TokenUser, AuthStatus} from '../index'
import { HttpClient  } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private readonly baseUrl: string = environment.BACKEND_URL;
    private readonly _http = inject(HttpClient);

    private _currentUser = signal<TokenUser|null>(null);
    private _authSatatus = signal<AuthStatus>( AuthStatus.checking );

    public currentUser = computed( () => this._currentUser() );
    public authStatus = computed( () => this._authSatatus() );

    constructor(){
      if (typeof window !== 'undefined') {
        this.setCurrentUserToken();
        console.log("ae")
      }
    }

    login( username: string, password: string ): Observable<boolean> {
        const body: LoginRequest = { username, password};
        
        return this._http.post<LoginResponse>(`${ this.baseUrl }auth/login`, body)
        .pipe(
          map( data => {
            return this.setAuthentication(data);
          }),    
        ) 
    }

    private setAuthentication(data: LoginResponse): boolean {
      const user: User  = data.user;

      console.log(data)

      if(user.isActive == false){
        this._authSatatus.set( AuthStatus.checking );
        return false;
      }else{
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', user.name);
        localStorage.setItem('img', user.photo);
        this.setCurrentUserToken();
        return true;
      }

    }

    private setCurrentUserToken(){
      const tokenStorage: string | null = localStorage.getItem('token');
      if (tokenStorage) {
        try {
          const tokenUser: TokenUser = this.getJwtPayload(tokenStorage.toString());
          this._currentUser.set(tokenUser);
          this._authSatatus.set(AuthStatus.authenticated);
        } catch (error) {
          console.error('Error decoding token:', error);
          this.logout();
        }
      } else {
        this._currentUser.set(null);
        this._authSatatus.set(AuthStatus.notAuthenticated);
      }
    }

    private getJwtPayload(token: string): TokenUser | any {
      try {
        const decodedToken: TokenUser | null = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        throwError('No se establecio el token correctamente')
      }
    }

    public logout(){
      this._currentUser.set(null);
      this._authSatatus.set( AuthStatus.notAuthenticated );
      localStorage.clear();
    }
    
}