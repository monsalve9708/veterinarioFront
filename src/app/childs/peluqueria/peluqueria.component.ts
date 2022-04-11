import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MascotasService } from 'src/app/service/mascotas/mascotas.service';
import { PeluqueriaService } from 'src/app/service/peluqueria/peluqueria.service';
import { Peluqueria } from 'src/app/model/peluqueria';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-peluqueria',
  templateUrl: './peluqueria.component.html',
  styleUrls: ['./peluqueria.component.css']
})
export class PeluqueriaComponent implements OnInit {
  messageError;
  page = 1;
  messageSucces;
  mascota;
  peluqueriaSelect: Peluqueria;
  cc;
  usuario: Usuario;
  peluqueriaList: Array<Peluqueria>;
  constructor(private route: Router, private routeActi: ActivatedRoute, private mascotasServices: MascotasService,
              private peluqueriaService: PeluqueriaService, private usuarioServices: UsuarioService) { }

  ngOnInit(): void {
    this.cc = this.routeActi.snapshot.paramMap.get('cc');
    this.getMascotasByIdentificacion();
    this.getByMascota();
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
  getByMascota(){
    this.peluqueriaService.getPeluqueriaByMascota(this.cc).subscribe(data => {
      this.peluqueriaList = data;
      if (!data){
        this.messageError = 'No se ha encontrado registros de peluquería';
        const promise = new Promise( (resolve, reject) => {
          setTimeout( () => {
            this.messageError = null;
            resolve();
          }, 5000);
        });
      }
    }, error => {
      this.messageError = 'Ocurrió un error, Intente nuevamente o comuníquese con su administrador';
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageError = null;
          resolve();
        }, 4000);
      });
    });
  }
  sendPeluqueria(item){
    this.peluqueriaSelect = item;
  }
  recieve(response){
    window.scroll(0,0);
    if (response) {
      this.getByMascota();
      this.messageSucces = 'El registro de peluquería se ha guardado exitosamente';
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageSucces = null;
          resolve();
        }, 4000);
      });
    }else {
      this.messageError = 'Ocurrió un error, Intente nuevamente o comuníquese con su administrador';
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageError = null;
          resolve();
        }, 4000);
      });
    }
  }
}
