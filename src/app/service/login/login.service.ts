import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/model/login';
import { Constans } from 'src/app/childs/utils/constans';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _usuario: Login;
  private _token: string;
  constructor(private http: HttpClient) { }

  authorization(login: Login): Observable<any> {
    const param = new URLSearchParams();
    param.set('grant_type', 'password');
    param.set('username', login.usuario);
    param.set('password', login.contraseña);
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
       Authorization : 'Basic ' + 'YW5ndWxhcmFwcDoxMjM0NQ=='});
    return this.http.post<any>(`${Constans.dominio}/huellassanas/oauth/token`, param.toString(), {headers: httpOptions});
  }
  guardarUsuario(acesstoken){
    const payload = this.obtenerDatosToken(acesstoken);
    this._usuario = new Login();
    this._usuario.usuario = payload.user_name;
    this._usuario.tipouse = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }
  guardatToken(acesstoken){
   this._token = acesstoken;
   sessionStorage.setItem('token', this._token);
  }
  obtenerDatosToken(accesstoken): any{
    if(accesstoken){
      return JSON.parse(atob(accesstoken.split('.')[1]));
    }
    return null;
  }
  isAuthenticated(): boolean{
    const payload = sessionStorage.getItem('token');
    if (payload){
      return true;
    }
    return false;
  }
  logout(){
    sessionStorage.clear();
  }
  hasRole(roleOne: string, roleTwo?: string, roleThree?: string, roleFour?: string, roleFive ?: string): boolean{
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuario.tipouse.includes(roleOne) || usuario.tipouse.includes(roleTwo) || usuario.tipouse.includes(roleThree) || 
    usuario.tipouse.includes(roleFour)
    || usuario.tipouse.includes(roleFive)) {
      return true;
    }
    return false;
  }
  }
