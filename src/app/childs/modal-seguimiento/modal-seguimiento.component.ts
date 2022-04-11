import { Component, Input, OnInit, OnChanges, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SeguimienoHistoria } from 'src/app/model/seguimientohistoria';

@Component({
  selector: 'app-modal-seguimiento',
  templateUrl: './modal-seguimiento.component.html',
  styleUrls: ['./modal-seguimiento.component.css']
})
export class ModalSeguimientoComponent implements OnInit {
  @Input() seguiHisto : SeguimienoHistoria;
  @Input() index;
  formGroup : FormGroup;
  @Output() notify = new EventEmitter();
  userActived;
   hoy = new Date();
  fecha = {date: {year: this.hoy.getFullYear(), month: this.hoy.getMonth(),
     day: this.hoy.getDay()}, time: {hour: this.hoy.getHours(), minute: this.hoy.getMinutes(),
       second: this.hoy.getSeconds()}}
  constructor() { 
    this.userActived = JSON.parse(sessionStorage.getItem('usuario'));
  }

  ngOnInit(): void {
    this.initForm();

  }
  initForm(){
    this.formGroup = new FormGroup({
      descripcion: new FormControl('')
    });
  }
  ngOnChanges(){
    if (this.seguiHisto) {
      this.formGroup.patchValue({descripcion: this.seguiHisto.descripcion});
    }else{
      this.initForm();
      this.seguiHisto = new SeguimienoHistoria();
      this.seguiHisto.fecha = this.fecha;
    }
  }
  emitir(){
    var response = {cdSeguimiento: this.seguiHisto.cdSeguimiento ? this.seguiHisto.cdSeguimiento : 0 , cdUsuario: this.userActived.usuario,
    descripcion: this.formGroup.get('descripcion').value, fecha: this.fecha , index: this.index};
    this.notify.emit(response);
  }
}
