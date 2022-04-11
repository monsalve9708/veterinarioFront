import { Component, OnInit, SimpleChanges, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validatorNoString } from '../utils/validatorsOnlyNumbers';
import { MaetlistaService } from 'src/app/service/maetlista/maetlista.service';
import { validatorsSelect } from '../utils/validatorsSelect';
import { Mascotas } from 'src/app/model/mascota';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MascotasService } from 'src/app/service/mascotas/mascotas.service';
import { Router } from '@angular/router';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-add-mascota',
  templateUrl: './add-mascota.component.html',
  styleUrls: ['./add-mascota.component.css']
})
export class AddMascotaComponent implements OnInit, OnChanges {
  mascotaForm: FormGroup;
  listEspecie;
  @Output() save: EventEmitter<string> = new EventEmitter();
  listRaza;
  identificacion = null;
  minDate = {year: 1990, month: 1, day: 1};
  maxDate = {year: 2200, month: 12, day: 1 };
  model: NgbDateStruct;
  cambio = 'Crear';
  addMenssage;
  displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
  messageSucesfull;
  messageError;
  idcliente;
  @Input() cdCliente;
  @Input() validActu;
  @Input() mascotaSelected: Mascotas;
  constructor(private maetService: MaetlistaService, private mascotaService: MascotasService) { 
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.idcliente = this.cdCliente;
    this.identificacion = null;
    if (this.mascotaSelected){
      this.mascotaForm.setValue({nombre: this.mascotaSelected.dsnombre,
        fechaNa: this.mascotaSelected.fechaNa,
        color: this.mascotaSelected.dscolor, especie: this.mascotaSelected.dsespecie, raza: this.mascotaSelected.dsraza,
        sexo: this.mascotaSelected.dssexo});
      this.identificacion = this.mascotaSelected.cdidentificacion;
    }
    if (this.validActu){
      this.cambio = 'Actualizar';
      this.addMenssage = 'actualizado';
      this.changeEspecie();
    }else {
      this.inciarForm();
      this.cambio = 'Crear';
      this.addMenssage = 'creado';
      this.listRaza = null;
    }
  }
  ngOnInit(): void {
    this.inciarForm();
    this.getEspecie();
  }
  inciarForm(){
    this.mascotaForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      fechaNa: new FormControl('', Validators.required),
      raza: new FormControl('Selección', validatorsSelect),
      color: new FormControl('', Validators.required),
      especie: new FormControl('Selección', validatorsSelect),
      sexo: new FormControl('Selección', validatorsSelect)
    });
  }
  changeEspecie(){
    switch (this.mascotaForm.value.especie) {
      case 'Canino':
        this.getRaza('listcanino');
        break;
      case 'Felino':
        this.getRaza('listfelinos');
        break;
      case 'Otros':
        this.getRaza('listotros');
        break;
      default:
      this.listRaza = null;
    }
    if(!this.mascotaForm.value.raza){
      this.mascotaForm.controls['raza'].setValue('Selección');
    }

  }
  getRaza(value) {
    return this.maetService.getByGrupo(value).subscribe(data => {
      this.mascotaForm.value.raza = 'Selección';
      this.listRaza = data;
    } );
  }
  getEspecie(){
    return this.maetService.getByGrupo('listespecie').subscribe(data => {
      this.listEspecie = data;
    } );
  }
  submit(){
    const mascotas = new Mascotas();
    mascotas.cdidentificacion = this.identificacion ? this.identificacion : '0';
    mascotas.dscolor = this.mascotaForm.value.color;
    mascotas.dsespecie = this.mascotaForm.value.especie;
    mascotas.dsraza = this.mascotaForm.value.raza;
    const fecha = this.mascotaForm.value.fechaNa;
    let day = fecha.day;
    if (day < 10){
      day = '0' + day;
    }
    let month = fecha.month;
    if (month < 10){
      month = '0' + month;
    }
    mascotas.fechaNa = day + '/' + month + '/' + fecha.year;
    mascotas.dsnombre = this.mascotaForm.value.nombre;
    mascotas.cdcliente = this.idcliente ?  this.idcliente : '';
    mascotas.dssexo = this.mascotaForm.value.sexo;
    this.orquestador(mascotas);

  }
  orquestador(mascota){
    return this.mascotaService.orquestador(mascota).subscribe(data => {
      this.sendInfo(data);
      this.messageError = null;
      this.messageSucesfull = 'Se ha ' + this.addMenssage + ' exitosamente';
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageSucesfull = null;
          if (!this.validActu){
            this.inciarForm();
          }
          resolve();
        }, 4000);
      });
    }, error => {
      this.messageSucesfull = null;
      this.messageError = 'Ocurrió un error al ' + this.cambio + ' la mascota, Intente nuevamente o comuníquese con su administrador';
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageError = null;
          resolve();
        }, 5000);
      });
    });
  }
  sendInfo(mascota){
    this.save.emit(mascota);
  }

}
