import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from 'src/app/service/mascotas/mascotas.service';
import { Mascotas } from 'src/app/model/mascota';
import { HistoriaClinica } from 'src/app/model/historiaclinica';
import { HistoriaService } from 'src/app/service/historia/historia.service';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  cc;
  page = 1;
  messageError;
  mascota: Mascotas;
  usuario: Usuario;
  historiaClinica: Array<HistoriaClinica>;
  constructor(private routeActi: ActivatedRoute, private mascotasServices: MascotasService, private route: Router,
              private historiaServices: HistoriaService, private usuarioServices: UsuarioService) { }

  ngOnInit(): void {
    this.cc = this.routeActi.snapshot.paramMap.get('cc');
    this.getMascotasByIdentificacion();
    this.getHistoriasClinicas();
  }
  getHistoriasClinicas(){
  this.historiaServices.getByMascota(this.cc).subscribe(data => {
    this.historiaClinica = data as Array<HistoriaClinica>;
  }, error => {
    this.messageError = 'Ocurrio un error, Intente nuevamente o comuniquese con su administrador';
    const promise = new Promise( (resolve, reject) => {
      setTimeout( () => {
        this.messageError = null;
        resolve();
      }, 4000);
    });
  });
  }
  getMascotasByIdentificacion(){
    return this.mascotasServices.getMascotaByIdentificacion(this.cc).subscribe(data => {
      this.mascota = data[0];
      this.mascota.fechaNa = this.mapFecha(this.mascota.fechaNa);
      this.usuarioServices.getByIdentificacion(this.mascota.cdcliente).subscribe(data => {
        this.usuario = data;
      });
    });
  }
  mapFecha(item){
    let day = item.day;
    if (day < 10){
      day = '0' + day;
    }
    let month = item.month;
    if (month < 10){
      month = '0' + month;
    }
    return day + '/' + month + '/' + item.year;
  }
  volver(){
    this.route.navigate(['/mascotas', {cc : this.cc}]);
  }
  verHistoria(historia: HistoriaClinica){
    this.route.navigate(['/historia', {cc : historia.cdMascota, cd: historia.cdHistoria}]);
  }
  routeTo(url) {
    this.route.navigate([url, {cc : this.cc}]);
  }
}
