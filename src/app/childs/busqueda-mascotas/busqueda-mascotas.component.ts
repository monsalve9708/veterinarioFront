import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Mascotas } from 'src/app/model/mascota';
import { MascotasService } from 'src/app/service/mascotas/mascotas.service';
import { empty } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { LoginService } from 'src/app/service/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { PlanhuellasService } from 'src/app/service/planhuellas/planhuellas.service';

@Component({
  selector: 'app-busqueda-mascotas',
  templateUrl: './busqueda-mascotas.component.html',
  styleUrls: ['./busqueda-mascotas.component.css']
})
export class BusquedaMascotasComponent implements OnInit {
  consulta: FormGroup;
  listMascotas: Array<Mascotas>;
  mascota: Mascotas;
  sendActua = false;
  validAnadir = false;
  mascotaReci;
  cdCliente;
  getErro = false;
  errorUser = false;
  validIrPlan = false;
  ValidInscripPlan = false;
  cc;
  tipo;
  constructor(private mascotasServices: MascotasService, private usuarioServices: UsuarioService,
              private formBuilder: FormBuilder, public loginService: LoginService, private route: Router,
              private routeActi: ActivatedRoute, private planHuellasServices: PlanhuellasService) { }

  ngOnInit(): void {
    this.iniciarForm();
    this.cc = this.routeActi.snapshot.paramMap.get('cc');
    this.tipo = this.routeActi.snapshot.paramMap.get('tipo');
    if (this.cc && this.tipo){
      this.consulta.patchValue({tipoId: 'cc', numeroIdent: this.cc});
      this.getMasctotasByCliente();
      this.validate();
    }else if (this.cc){
      this.consulta.patchValue({tipoId: 'cm', numeroIdent: this.cc});
      this.getMascotasByIdentificacion();
    }
  }
  iniciarForm(){
    this.consulta = this.formBuilder.group({
      tipoId: new FormControl('cc'),
      numeroIdent: new FormControl('', Validators.required)
    });
  }
  actionButton(){
    this.validIrPlan = false;
    this.ValidInscripPlan = false;
    if (this.consulta.value.numeroIdent !== "") {

    if (this.consulta.value.tipoId === 'cc'){
      this.verificacion();
      this.validate();
    }
    else{
      this.getMascotasByIdentificacion();
    }     
  }else{
    this.validIrPlan = false;
    this.ValidInscripPlan = false;
    this.validAnadir = false;
  }
  }
  validate(){
    this.planHuellasServices.validate(this.consulta.value.numeroIdent).subscribe(data => {
      if (data) {
        this.validIrPlan = true;
      }else{
        this.ValidInscripPlan =  true;
      }
    });
  }

  getMascotasByIdentificacion(){
    return this.mascotasServices.getMascotaByIdentificacion(this.consulta.value.numeroIdent).subscribe(data => {
      this.listMascotas = data;
      this.validAnadir = false;
    },
    error => {
      this.getErro = true;
      const promise = new Promise( (resolve, reject) => {
        this.validAnadir = false;
        this.listMascotas = null;
        setTimeout( () => {
          this.getErro = false;
          resolve();
        }, 5000);
      });
    });
  }
  getMasctotasByCliente(){
    return this.mascotasServices.getMascotaByCdcliente(this.consulta.value.numeroIdent).subscribe(data => {
      this.listMascotas = data;
      this.validAnadir = true;
      this.cdCliente = this.consulta.value.numeroIdent;
    },
    error => {
      const promise = new Promise( (resolve, reject) => {
        this.getErro = true;
        this.validAnadir = true;
        this.listMascotas = null;
        this.cdCliente = this.consulta.value.numeroIdent;
        setTimeout( () => {
          this.getErro = false;
          resolve();
        }, 5000);
      });
    });
  }
  verificacion(){
    return this.usuarioServices.verificaUsuario(this.consulta.value.numeroIdent).subscribe(data => {
      const promise = new Promise( (resolve, reject) => {
        this.errorUser = true;
        this.listMascotas = null;
        this.validAnadir = false;
        setTimeout( () => {
          this.errorUser = false;
          resolve();
        }, 5000);
      });
    },
    error => {
      this.getMasctotasByCliente();
    });
  }
  sendMascota(item){
    this.mascota = item;
    this.sendActua = true;
  }
  noSendMascota(){
    this.sendActua = false;
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
  recibirInfo(event){
    this.mascotaReci = event;
    this.actionButton();
  }
  recibirInscrip(event){
    this.actionButton();
  }
  routeTo(mas: Mascotas, url) {
    this.route.navigate([url, {cc : mas.cdidentificacion}]);
  }
  deleteMascota(cdmascota){
    swal({
      title: 'Estas seguro?',
      icon: 'warning',
      buttons: ['cancelar', 'Eliminar'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.mascotasServices.deleteMascota(cdmascota).subscribe(data => {
          if (data) {
            this.actionButton();
            swal('La mascota ha sido eliminada exitosamente', {
              icon: 'success',
            });
          }
        });
      }
    });
  }
  warning(){
    swal('Pagina en construcción', {
      icon: 'error',
    });
  }
  routeToHuellas() {
    this.route.navigate(["/planhuellas", {cd : this.cdCliente}]);
  }
}
