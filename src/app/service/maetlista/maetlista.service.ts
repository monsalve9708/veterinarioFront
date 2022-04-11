import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { addAuthorization } from 'src/app/childs/utils/getToken';
import { Constans } from 'src/app/childs/utils/constans';

@Injectable({
  providedIn: 'root'
})
export class MaetlistaService {

  constructor(private http: HttpClient) { }

  getByGrupo(cdGrupo: any): Observable<any>{
    const httpParam = new HttpParams().set('cdGrupo', cdGrupo);
    const httpOptions = { headers: addAuthorization(), params: httpParam};
    return this.http.get(`${Constans.dominio}${Constans.context}/maet/getbycdgrupo`, httpOptions);
  }
  getBycd(cdMaet: any): Observable<any>{
    const httpParam = new HttpParams().set('cdMaet', cdMaet);
    const httpOptions = { headers: addAuthorization(), params: httpParam};
    return this.http.get(`${Constans.dominio}${Constans.context}/maet/getbycd`, httpOptions);
  }
  getProducto(): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.get(`${Constans.dominio}${Constans.context}/maet/getmedicamentos`, httpOptions);
  }
}
