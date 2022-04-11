import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { addAuthorization } from 'src/app/childs/utils/getToken';
import { Constans } from 'src/app/childs/utils/constans';

@Injectable({
  providedIn: 'root'
})
export class PeluqueriaService {

  constructor(private http: HttpClient) { }

  getPeluqueriaByMascota(cdMascota: any): Observable<any> {
    const httParams = new HttpParams().set('cdMascota', cdMascota);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans.dominio}${Constans.context}/peluqueria/getbymascota`, httpOptions);
  }
  orquestador(peluqueria): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.post(`${Constans.dominio}${Constans.context}/peluqueria/orquestador`, JSON.stringify(peluqueria), httpOptions);
  }
}
