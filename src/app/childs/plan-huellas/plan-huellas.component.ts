import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanHuellas } from 'src/app/model/planhuellas';
import { PlanHuellasTransa } from 'src/app/model/planhuellasTransa';
import { Usuario } from 'src/app/model/usuario';
import { PlanhuellasService } from 'src/app/service/planhuellas/planhuellas.service';
import { PlanhuellasTransaService } from 'src/app/service/planhuellastransa/planhuellasTransa.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import swal from 'sweetalert';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-plan-huellas',
  templateUrl: './plan-huellas.component.html',
  styleUrls: ['./plan-huellas.component.css']
})
export class PlanHuellasComponent implements OnInit {
  cdCliente;
  cliente: Usuario;
  planHuellas: PlanHuellas;
  cdPlan;
  planhuellasTransas: Array<PlanHuellasTransa>
  page = 1;
  total = 0;

  constructor(private routeActi: ActivatedRoute, private usuarioService: UsuarioService,
    private planhuellasService: PlanhuellasService, 
    private planHuellasTransaServices: PlanhuellasTransaService,private route: Router) { }
  
  ngOnInit(): void {
    this.cdCliente = this.routeActi.snapshot.paramMap.get('cd');
    this.getCliente();
    this.getPlan();
  }
  getCliente(){
    this.usuarioService.getByIdentificacion(this.cdCliente).subscribe(data => {
    this.cliente = data as Usuario;
    });
  }
  getPlan(){
   this.planhuellasService.getByCliente(this.cdCliente).subscribe(data => {
      this.planHuellas = data[0] as PlanHuellas;
      this.cdPlan = this.planHuellas.cdPlanHuellas;
      this.getPlanes()
      this.getValor();
    });
  }
  getPlanes(){
    if (this.planHuellas) {
    this.planHuellasTransaServices.getByCdPlanHuellas(this.planHuellas.cdPlanHuellas).subscribe(data => {
      this.planhuellasTransas = data as Array<PlanHuellasTransa>;
      
    });
  }
  }
  volver(){
    this.route.navigate(['/mascotas', {cc : this.cdCliente, tipo: "cc"}]);
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
  getValor(){
    this.planHuellasTransaServices.getValorByCdPlanHuellas(this.planHuellas.cdPlanHuellas).subscribe(data => {
      this.total = data;
    });
  }
  recibirInscrip(event){
    this.getPlanes();
    this.getValor();
  }
  deletePlan(item){
    swal({
      title: 'Estas seguro?',
      icon: 'warning',
      buttons: ['cancelar', 'Eliminar'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.planHuellasTransaServices.delete(item).subscribe(data => {
          if (data) {
            this.getPlanes()
      this.getValor();
            swal('La transacion ha sido eliminada exitosamente', {
              icon: 'success',
            });
          }
        });
      }
    });
  }
  downloadCsV(){
    var options = { showLabels: true};
    var data = [
    {
      Id: "Id",
      Fecha: "Fecha de creación",
      Descripcion: "Descripcion",
      Valor: "Valor"
    }
  ];
    var menosmas = 1;
    this.planhuellasTransas.forEach(element => {
      data.push({
        
      Id: menosmas.toString(),
      Fecha: this.mapFecha(element.fechaOperacion),
      Descripcion: element.descripcion,
      Valor: element.valor.toString()
      });
      menosmas++;
    });
    data.push( {
      Id: "",
      Fecha: "",
      Descripcion: "Saldo a favor",
      Valor: this.total.toString()
    });
    var csv = new AngularCsv(data, this.cliente.identificacion,options);
  }
  
}