import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { validatorNoString } from '../utils/validatorsOnlyNumbers';
import { validatorsSelect } from '../utils/validatorsSelect';
import { Peluqueria } from 'src/app/model/peluqueria';
import { PeluqueriaService } from 'src/app/service/peluqueria/peluqueria.service';

@Component({
  selector: 'app-modal-peluqueria',
  templateUrl: './modal-peluqueria.component.html',
  styleUrls: ['./modal-peluqueria.component.css']
})
export class ModalPeluqueriaComponent implements OnInit, OnChanges {
  @Input() cc;
  model: NgbDateStruct;
  @Output() notify = new EventEmitter<boolean>();
  @Input() peluqueriaSelected: Peluqueria;
  @ViewChild('close') closeBtn;
  userActived;
  peluqueriaForm = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private peluqueriaServices: PeluqueriaService) {
    this.userActived = JSON.parse(sessionStorage.getItem('usuario'));
  }
ngOnChanges(changes: SimpleChanges): void {
  if (this.peluqueriaSelected) {
    this.peluqueriaForm.patchValue({producto: this.peluqueriaSelected.tipoProducto,
    valor: this.peluqueriaSelected.valor, fecha: this.mapFecha(this.peluqueriaSelected.fecha),
    usuario: this.peluqueriaSelected.cdUsuario, descripcion: this.peluqueriaSelected.descripcion});
  }
  if (!this.peluqueriaSelected) {
    this.initForm();
  }
}
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.peluqueriaForm = this.formBuilder.group({
      producto: new FormControl('Selección', [Validators.required, validatorsSelect]),
      valor: new FormControl('', [Validators.required, validatorNoString]),
      fecha: new FormControl(''),
      usuario: new FormControl(''),
      descripcion: new FormControl('', Validators.required)
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
  submit(){
    const peluqueria = new Peluqueria();
    peluqueria.cdUsuario = this.userActived.usuario;
    peluqueria.descripcion = this.peluqueriaForm.value.descripcion;
    peluqueria.tipoProducto = this.peluqueriaForm.value.producto;
    peluqueria.valor = this.peluqueriaForm.value.valor;
    peluqueria.cdMascota = this.cc;
    this.orquestador(peluqueria);
    this.closeBtn.nativeElement.click();
  }
orquestador(peluqueria){
  this.peluqueriaServices.orquestador(peluqueria).subscribe(data => {
    this.emitir(true);
    this.initForm();
  }, error => {
    this.emitir(false);
    this.initForm();
  });
}
emitir(response: boolean){
  this.notify.emit(response);
}
}
