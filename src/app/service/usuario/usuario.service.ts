import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { addAuthorization } from 'src/app/childs/utils/getToken';
import { Constans } from 'src/app/childs/utils/constans';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  createUsuario(usuario: any): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.post( `${Constans.dominio}${Constans.context}/usuario/create`, JSON.stringify(usuario), httpOptions);
  }
  verificaUsuario(identificacion: any): Observable<any>{
    const httpOptions = addAuthorization();
    const httParams = new HttpParams().set('identificacion', identificacion);
    return this.http.get(`${Constans.dominio}${Constans.context}/usuario/verif`, {headers: httpOptions, params: httParams});
  }
  getByIdentificacion(identificacion: any): Observable<any>{
    const httpOptions =  ();
    const httParams = new HttpParams().set('identificacion', identificacion);
    return this.http.get(`${Constans.dominio}${Constans.context}/usuario/identificacion`, {headers: httpOptions, params: httParams});
  }
  verificaUsuarioByCdUsuario(cdUsuario: any): Observable<any>{
    const httpOptions = addAuthorization();
    const httParams = new HttpParams().set('cdusuario', cdUsuario);
    return this.http.get(`${Constans.dominio}${Constans.context}/usuario/verifbycdusuario`, {headers: httpOptions, params: httParams});
  }
  change(usuario: any): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.post( `${Constans.dominio}${Constans.context}/usuario/change`, JSON.stringify(usuario), httpOptions);
  }
  getUsuarios(): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.get( `${Constans.dominio}${Constans.context}/usuario/getusuarios`, httpOptions);
  }
}
