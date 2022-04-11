import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Mascotas } from 'src/app/model/mascota';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { FormArray, FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { MaetlistaService } from 'src/app/service/maetlista/maetlista.service';
import { validatorsSelect } from '../utils/validatorsSelect';
import { Formula } from 'src/app/model/formula';
import { DescripFormula } from 'src/app/model/descripformula';
import { FormulaRequest } from 'src/app/model/formularequest';
import { FormulaService } from 'src/app/service/formula/formula.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-modal-formula',
  templateUrl: './modal-formula.component.html',
  styleUrls: ['./modal-formula.component.css']
})
export class ModalFormulaComponent implements OnInit, OnChanges {
  @Input() mascota: Mascotas;
  usuario: Usuario;
  @Input() cdHistoria;
  formularioForm = new FormArray([]);
  producto = new Array();
  formGruoup;
  messageError;
  messageSucesfull;
  userActived;
  requestSelected: FormulaRequest;
  formulaSelected: Array<DescripFormula>;
  constructor(private usuarioServices: UsuarioService, private maetService: MaetlistaService, private formulaServices: FormulaService) {
    this.userActived = JSON.parse(sessionStorage.getItem('usuario'));
  }
ngOnChanges(changes: SimpleChanges): void {
   if (this.mascota) {
    this.getUsuario();
   }
   if (this.cdHistoria) {
     this.getByCd();
   }
}
  ngOnInit(): void {
    this.getProducto();
    this.initArray();
  }
  initArray(){
    this.formGruoup = new FormGroup({
      producto: new FormControl(''),
      presentacion: new FormControl('Selección'),
      elegir: new FormControl('Selección'),
      descripcion: new FormControl('Administrar _ _  vía _ cada _ horas durante _ días', Validators.required)

     });
    this.formularioForm.push(this.formGruoup);
  }
getUsuario(){
  this.usuarioServices.getByIdentificacion(this.mascota.cdcliente).subscribe(data => {
    this.usuario = data;
  });
}
  getProducto(){
    this.maetService.getProducto().subscribe(data => {
      this.producto = data;
    });
  }
  submit(){
    const listFormula = new Array<DescripFormula>();
    this.formularioForm.controls.forEach((data, index) => {
      const descrip = new DescripFormula();
      if (data.value.producto){
        descrip.dsMedicamentos = data.value.producto + ' ' + data.value.presentacion;
      }else {
        descrip.dsMedicamentos = data.value.elegir;
      }
      descrip.dsDescripcion = data.value.descripcion;
      if (this.formulaSelected) {
        descrip.cdDescripFormula = this.formulaSelected[index] ? this.formulaSelected[index].cdDescripFormula : 0;
      }else {
        descrip.cdDescripFormula = 0;
      }
      descrip.cdFormula = 0;
      listFormula.push(descrip);
      });
    const formula = new Formula();
    formula.cdUsuario = this.userActived.usuario;
    formula.cdHistoria = this.cdHistoria;
    if (this.requestSelected){
    formula.cdFormula =  this.requestSelected.formula ? this.requestSelected.formula.cdFormula : 0;
    }
    const request = new FormulaRequest();
    request.descripFormula = listFormula;
    request.formula = formula;

    this.formulaServices.orquestador(request).subscribe(data => {
      this.getProducto();
      this.requestSelected = data;
      this.formulaSelected = this.requestSelected.descripFormula;
      this.setValue();
      this.messageError = null;
      this.messageSucesfull = 'Se ha creado o actualizado exitosamente la formula medica';
      window.scroll(0, 0);
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageSucesfull = null;
          resolve();
        }, 4000);
      });
    }, error => {
      this.messageError = 'Ocurrió un error, Intente nuevamente o comuníquese con su administrador';
      this.messageSucesfull = null;
      window.scroll(0, 0);
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageError = null;
          resolve();
        }, 4000);
      });
    });
  }
  setValue(){
    if (this.formulaSelected) {
      this.formularioForm = new FormArray([]);
      this.formulaSelected.forEach(data =>  {
        if (data.dsMedicamentos) {
          this.formGruoup = new FormGroup({
            producto: new FormControl(''),
            presentacion: new FormControl('Selección'),
            elegir: new FormControl(data.dsMedicamentos ? data.dsMedicamentos : 'Selección'),
            descripcion: new FormControl(data.dsDescripcion ? data.dsDescripcion : 'Administrar _ _  vía _ cada _ horas durante _ días',
             Validators.required)
           });
          this.formularioForm.push(this.formGruoup);
        }
      });
    }
  }
  getByCd(){
    this.formulaServices.getByCdHistoria(this.cdHistoria).subscribe(data => {
      if (data) {
        this.requestSelected = data as FormulaRequest;
        this.formulaSelected = this.requestSelected.descripFormula;
        this.setValue();
      }
    }, error => {
      this.messageError = 'Ocurrió un error, Intente nuevamente o comuníquese con su administrador';
      this.messageSucesfull = null;
      window.scroll(0, 0);
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageError = null;
          resolve();
        }, 4000);
      });
    });
  }
}
