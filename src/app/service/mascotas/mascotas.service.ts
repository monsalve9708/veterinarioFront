import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { addAuthorization } from 'src/app/childs/utils/getToken';
import { Constans } from 'src/app/childs/utils/constans';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private http: HttpClient) { }

  getMascotaByIdentificacion(identificacion: any): Observable<any> {
    const httParams = new HttpParams().set('identificacion', identificacion);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans.dominio}${Constans.context}/mascotas/byidentificacion`, httpOptions);
  }
  getMascotaByCdcliente(cdCliente: any): Observable<any> {
    const httParams = new HttpParams().set('cdcliente', cdCliente);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans.dominio}${Constans.context}/mascotas/bycliente`, httpOptions);
  }
  orquestador(mascota): Observable<any>{
    const httpOptions = { headers: addAuthorization()};
    return this.http.post(`${Constans.dominio}${Constans.context}/mascotas/orquestador`, JSON.stringify(mascota), httpOptions);
  }
  deleteMascota(cdMascota: any): Observable<any> {
    const httParams = new HttpParams().set('cdMascota', cdMascota);
    const httpOptions = { headers: addAuthorization(), params: httParams};
    return this.http.get(`${Constans.dominio}${Constans.context}/mascotas/delete`, httpOptions);
  }
}
