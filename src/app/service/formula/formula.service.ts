import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constans } from 'src/app/childs/utils/constans';
import { addAuthorization } from 'src/app/childs/utils/getToken';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  constructor(private http: HttpClient) { }

  orquestador(formula): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.post(`${Constans.dominio}${Constans.context}/formula/orquestador`, JSON.stringify(formula), httpOptions);
  }
  getByCdHistoria(cdHistori){
    const httpParams = new HttpParams().set('cdHistoria', cdHistori);
    const httpOptions = { headers: addAuthorization(), params: httpParams};
    return this.http.get(`${Constans.dominio}${Constans.context}/formula/getbycdhistoria`, httpOptions);
  }
}
