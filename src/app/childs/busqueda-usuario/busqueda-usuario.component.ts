import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/service/login/login.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { PlanhuellasService } from 'src/app/service/planhuellas/planhuellas.service';
import { Reporte } from 'src/app/model/reporte';

@Component({
  selector: 'app-busqueda-usuario',
  templateUrl: './busqueda-usuario.component.html',
  styleUrls: ['./busqueda-usuario.component.css']
})
export class BusquedaUsuarioComponent implements OnInit {
  usuario: Array<Usuario>;
  page = 1;
  reportes: Array<Reporte>
  searchTerm: FormGroup;
  pageSize = 100;
  constructor(public usuarioServices: UsuarioService, private route: Router, public loginService: LoginService, private planHuellasServices: PlanhuellasService) {
    this.init();
   }

  ngOnInit(): void {
    this.usuarioServices.getUsuarios().subscribe(data => {
      this.usuario = data;
    });
  }
  init(){
    this.searchTerm = new FormGroup({
      dato : new FormControl('')
    });
  }
  refrescarUsuario() {
    this.usuario = this.usuario
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  mascotas(cedula){
    this.route.navigate(['/mascotas', {cc : cedula, tipo : 'persona'}]);
  }
  registro(cedula){
    this.route.navigate(['/registro', {cc : cedula}]);
  }
  gerReporte(){
    this.planHuellasServices.reporte().subscribe(data => {
      this.reportes = data;
      this.downloadCsV(this.reportes);
    });
  }
  downloadCsV(reportes: Array<Reporte>){
    var options = { showLabels: true};
    var data = [
    {
      Id: "Id",
      Identificacion: "Identificacion",
      Nombre: "Nombre",
      Saldo: "Saldo a favor"
    }
  ];
  var index = 1;
  reportes.forEach(x => {
    data.push({
      Id: index.toString(),
      Identificacion: x.cdcliente,
      Nombre: x.nombre,
      Saldo: x.saldo.toString()
    });
    index++;
  });
  
    var csv = new AngularCsv(data, "Reporte Plan Huellas",options);
  }
}
