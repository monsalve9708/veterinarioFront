import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constans } from 'src/app/childs/utils/constans';
import { addAuthorization } from 'src/app/childs/utils/getToken';
import { PlanHuellas } from 'src/app/model/planhuellas';

@Injectable({
  providedIn: 'root'
})
export class PlanhuellasService {

  constructor(private http: HttpClient) { }

  validate(cdCliente: any): Observable<any> {
    const httParams = new HttpParams().set('cdcliente', cdCliente);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans .dominio}${Constans.context}/planhuellas/validate`, httpOptions);
  }
  create(planhuellas: PlanHuellas): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.post(`${Constans.dominio}${Constans.context}/planhuellas/create`, JSON.stringify(planhuellas), httpOptions);
  }
  update(planhuellas: PlanHuellas): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.post(`${Constans.dominio}${Constans.context}/planhuellas/update`, JSON.stringify(planhuellas), httpOptions);
  }
  getByCliente(cdCliente: any): Observable<any> {
    const httParams = new HttpParams().set('cdcliente', cdCliente);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans .dominio}${Constans.context}/planhuellas/getbycliente`, httpOptions);
  }
  get(): Observable<any> {
    const httpOptions = { headers: addAuthorization()};
    return this.http.get(`${Constans .dominio}${Constans.context}/planhuellas/get`, httpOptions);
  }
  reporte(): Observable<any> {
    const httpOptions = { headers: addAuthorization()};
    return this.http.get(`${Constans .dominio}${Constans.context}/planhuellas/reporte`, httpOptions);
  }
}
