import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constans } from 'src/app/childs/utils/constans';
import { addAuthorization } from 'src/app/childs/utils/getToken';
import { PlanHuellas } from 'src/app/model/planhuellas';
import { PlanHuellasTransa } from 'src/app/model/planhuellasTransa';

@Injectable({
  providedIn: 'root'
})
export class PlanhuellasTransaService {

  constructor(private http: HttpClient) { }

  create(planhuellasTransa: PlanHuellasTransa): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.post(`${Constans.dominio}${Constans.context}/planhuellastransas/create`, JSON.stringify(planhuellasTransa), httpOptions);
  }
  update(planhuellasTransa: PlanHuellasTransa): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.post(`${Constans.dominio}${Constans.context}/planhuellastransas/update`, JSON.stringify(planhuellasTransa), httpOptions);
  }
  getByCdPlanHuellas(cdPlanHuellas: any): Observable<any> {
    const httParams = new HttpParams().set('cdplanhuellas', cdPlanHuellas);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans .dominio}${Constans.context}/planhuellastransas/getcdplanhuellas`, httpOptions);
  }
  delete(cdPlanHuellas: any): Observable<any> {
    const httParams = new HttpParams().set('cdplanhuellastransa', cdPlanHuellas);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans .dominio}${Constans.context}/planhuellastransas/delete`, httpOptions);
  }
  getValorByCdPlanHuellas(cdPlanHuellas: any): Observable<any> {
    const httParams = new HttpParams().set('cdplanhuellas', cdPlanHuellas);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans .dominio}${Constans.context}/planhuellastransas/gettotal`, httpOptions);
  }
}
