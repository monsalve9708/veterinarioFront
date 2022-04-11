import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { addAuthorization } from 'src/app/childs/utils/getToken';
import { Constans } from 'src/app/childs/utils/constans';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  constructor(private http: HttpClient) { }

  getComplemento(): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.get(`${Constans.dominio}${Constans.context}/historia/getcomplementa`, httpOptions);
  }
  getDiferencial(): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.get(`${Constans.dominio}${Constans.context}/historia/getdiferencial`, httpOptions);
  }
  getMaestra(): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.get(`${Constans.dominio}${Constans.context}/historia/getmaestra`, httpOptions);
  }
  getproblema(): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.get(`${Constans.dominio}${Constans.context}/historia/getproblema`, httpOptions);
  }
  getproducto(): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.get(`${Constans.dominio}${Constans.context}/historia/getproduc`, httpOptions);
  }
  orquestador(historiaClinica): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.post(`${Constans.dominio}${Constans.context}/historia/orquestador`, JSON.stringify(historiaClinica), httpOptions);
  }
  getByHistoria(cdHistoria: any): Observable<any> {
    const httParams = new HttpParams().set('cdHistoria', cdHistoria);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans.dominio}${Constans.context}/historia/getbycdhistoria`, httpOptions);
  }
  getPdfHistoria(cdHistoria: any, cdMascota): Observable<any> {
    const httParams = new HttpParams().set('cdHistoria', cdHistoria).set('cdMascota', cdMascota);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans.dominio}${Constans.context}/historia/getpdfhistoria`, httpOptions);
  }
   getByMascota(cdMascota: any): Observable<any> {
    const httParams = new HttpParams().set('cdMascota', cdMascota);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans.dominio}${Constans.context}/historia/getbycdmascota`, httpOptions);
  }
}
