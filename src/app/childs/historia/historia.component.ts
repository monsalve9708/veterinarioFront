import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotasService } from 'src/app/service/mascotas/mascotas.service';
import { Mascotas } from 'src/app/model/mascota';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HistoriaService } from 'src/app/service/historia/historia.service';
import { HistoriaClinicaRequest } from 'src/app/model/historiaclinicarequest';
import { HistoriaClinica } from 'src/app/model/historiaclinica';
import { DescripHistoria } from 'src/app/model/descriphistoria';
import { DetalleTabla } from 'src/app/model/detalletabla';
import { MaetlistaService } from 'src/app/service/maetlista/maetlista.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Usuario } from 'src/app/model/usuario';
//import pdfmake from "pdfmake/build/pdfmake"; 
//import pdfFonts from "pdfmake/build/vfs_fonts";
import { right } from '@popperjs/core';
import { SeguimienoHistoria } from 'src/app/model/seguimientohistoria';

//pdfmake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfmake.vfs;  
@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit {
  cc;
  cd;
  cdHistoria;
  messageError;
  messageSucesfull;
  boolVacu = false;
  boolDes = false;
  model: NgbDateStruct;
  minDate = {year: 1990, month: 1, day: 1};
  maxDate = {year: 2200, month: 12, day: 1 };
  mascota: Mascotas;
  arrayTabla = new FormArray([]);
  seguiHistoria = new Array<SeguimienoHistoria>();
  seguimiento: SeguimienoHistoria;
  historiaForm: FormGroup;
  formGruoup: FormGroup;
  complemento = new Array();
  diferencia = new Array();
  historiaClinicaSelectd: HistoriaClinicaRequest;
  historiaClinica: HistoriaClinica;
  descripHistoria: DescripHistoria;
  detalleTabla: Array<DetalleTabla>;
  formu = false;
  maestra = new Array();
  problema = new Array();
  producto = new Array();
  usuario: Usuario;
  validProduct;
  userActived;
  index;
  constructor(private routeActi: ActivatedRoute, private mascotasServices: MascotasService, private historiaService: HistoriaService,
              private route: Router, private maetService: MaetlistaService, private usuarioSerice: UsuarioService) { }

  ngOnInit(): void {
    this.userActived = JSON.parse(sessionStorage.getItem('usuario'));
    this.initForm();
    this.getComplemento();
    this.getDiferencial();
    this.getMaestra();
    this.getProblema();
    this.getProducto();
    this.cc = this.routeActi.snapshot.paramMap.get('cc');
    this.cd = this.routeActi.snapshot.paramMap.get('cd');
    if (this.cd) {
      this.getAll();
    }
    this.getMascotasByIdentificacion();
    this.initArray();
  }

  initArray(){
    this.formGruoup = new FormGroup({
      problema: new FormControl(''),
      problemaSelect: new FormControl('Selección'),
      maestra: new FormControl(''),
      maestraSelect: new FormControl('Selección'),
      diferencial: new FormControl(''),
      diferencialSelect: new FormControl('Selección'),
      complemen: new FormControl(''),
      complemenSelect: new FormControl('Selección'),
     });
    this.arrayTabla.push(this.formGruoup);
  }
  initForm(){
    this.historiaForm = new FormGroup({
      tipoVivienda: new FormControl(''),
      alimento: new FormControl(''),
      frecuencia: new FormControl(''),
      reproductivo: new FormControl(''),
      tratamientos: new FormControl(''),
      cantidadMascota: new FormControl(''),
      fechaDes: new FormControl(''),
      fechaVacu: new FormControl(''),
      elegirVacu: new FormControl('Selección'),
      elegirDes: new FormControl('Selección'),
      enfermedades: new FormControl(''),
      cirugias: new FormControl(''),
      motivo: new FormControl(''),
      temperatura: new FormControl(''),
      temperamento: new FormControl(''),
      peso: new FormControl(''),
      fc: new FormControl(''),
      fr: new FormControl(''),
      tllc: new FormControl(''),
      mm: new FormControl(''),
      pulso: new FormControl(''),
      actitud: new FormControl('NE'),
      hidratacion: new FormControl('NE'),
      nervioso: new FormControl('NE'),
      piel: new FormControl('NE'),
      muscu: new FormControl('NE'),
      respiratorio: new FormControl('NE'),
      cardiovacular: new FormControl('NE'),
      digestivo: new FormControl('NE'),
      urinario: new FormControl('NE'),
      linofoi: new FormControl('NE'),
      reproductor: new FormControl('NE'),
      ojos: new FormControl('NE'),
      oidos: new FormControl('NE'),
      hallaz: new FormControl(''),
      detalle: new FormControl(''),
      terapeu: new FormControl(''),
      segui: new FormControl('')
    });
  }
  getMascotasByIdentificacion(){
    return this.mascotasServices.getMascotaByIdentificacion(this.cc).subscribe(data => {
      this.mascota = data[0];
      this.mascota.fechaNa = this.mapFecha(this.mascota.fechaNa);
      this.usuarioSerice.getByIdentificacion(this.mascota.cdcliente).subscribe(data => {
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
  buildHistoriaRequest(){
    const historiaClinicaRequest = new HistoriaClinicaRequest();
    const historiaClinica = this.buildHistoriaClinica();
    historiaClinicaRequest.historiaClinica = historiaClinica;
    const descriphisto = this.buildDescripHistoria();
    historiaClinicaRequest.desccripHistoria = descriphisto;
    const detalleTabla = this.buildDetalleTabla();
    historiaClinicaRequest.detalleTablas = detalleTabla;
    historiaClinicaRequest.seguimientoHistoria = this.seguiHistoria;
    return historiaClinicaRequest;
  }
  buildDetalleTabla(){
    const listaDetalle = new Array<DetalleTabla>();
    for (let data = 0; data < this.arrayTabla.controls.length; data++) {
      const detalleTabla = new DetalleTabla();
      detalleTabla.cdHistoria =  this.detalleTabla && this.detalleTabla[data] ? this.detalleTabla[data].cdHistoria : 0;
      detalleTabla.cdDetalleTabla = this.detalleTabla && this.detalleTabla[data] ? this.detalleTabla[data].cdDetalleTabla : 0;
      detalleTabla.dsProblema = this.arrayTabla.controls[data].value.problema ? this.arrayTabla.controls[data].value.problema :
         this.arrayTabla.controls[data].value.problemaSelect;
      detalleTabla.dsMaestra = this.arrayTabla.controls[data].value.maestra ? this.arrayTabla.controls[data].value.maestra :
        this.arrayTabla.controls[data].value.maestraSelect;
      detalleTabla.dsDiferencial = this.arrayTabla.controls[data].value.diferencial ? this.arrayTabla.controls[data].value.diferencial :
        this.arrayTabla.controls[data].value.diferencialSelect;
      detalleTabla.dsComplementa = this.arrayTabla.controls[data].value.complemen ? this.arrayTabla.controls[data].value.complemen :
        this.arrayTabla.controls[data].value.complemenSelect;
      listaDetalle.push(detalleTabla);
    }
    return listaDetalle;
  }
  buildDescripHistoria(){
    const descrip = new DescripHistoria();
    descrip.cdHistoria = this.descripHistoria ? this.descripHistoria.cdHistoria : 0;
    descrip.cdDescripHistoria = this.descripHistoria ? this.descripHistoria.cdDescripHistoria : 0;
    descrip.dsActitud = this.historiaForm.value.actitud;
    descrip.dsAlimento = this.historiaForm.value.alimento;
    descrip.dsFrecuencia = this.historiaForm.value.frecuencia;
    descrip.dsReproductivo = this.historiaForm.value.reproductivo;
    descrip.dsTratamientos = this.historiaForm.value.tratamientos;
    descrip.dsCardio = this.historiaForm.value.cardiovacular;
    descrip.dsCirugias = this.historiaForm.value.cirugias;
    descrip.dsConsulta = this.historiaForm.value.detalle;
    descrip.dsDiges = this.historiaForm.value.digestivo;
    descrip.dsEnfermedades = this.historiaForm.value.enfermedades;
    descrip.dsFc = this.historiaForm.value.fc;
    descrip.dsFr = this.historiaForm.value.fr;
    descrip.dsHallaz = this.historiaForm.value.hallaz;
    descrip.dsHidratacion = this.historiaForm.value.hidratacion;
    descrip.dsLinfoi = this.historiaForm.value.linofoi;
    descrip.dsMm = this.historiaForm.value.mm;
    descrip.dsMotivo = this.historiaForm.value.motivo;
    descrip.dsMuscu = this.historiaForm.value.muscu;
    descrip.dsNervioso = this.historiaForm.value.nervioso;
    descrip.dsOidos = this.historiaForm.value.oidos;
    descrip.dsOjos = this.historiaForm.value.ojos;
    descrip.dsPeso = this.historiaForm.value.peso;
    descrip.dsPiel = this.historiaForm.value.piel;
    const fecha = this.historiaForm.value.fechaDes;
    if (fecha){
    let day = fecha.day;
    if (day < 10){
      day = '0' + day;
    }
    let month = fecha.month;
    if (month < 10){
      month = '0' + month;
    }
    descrip.fechaDes = day + '/' + month + '/' + fecha.year;
  } else {
    descrip.fechaDes = undefined;
  }
    const fechava = this.historiaForm.value.fechaVacu;
    if (fechava){
    let dayva = fechava.day;
    if (dayva < 10){
      dayva = '0' + dayva;
    }
    let monthva = fechava.month;
    if (monthva < 10){
      monthva = '0' + monthva;
    }
    descrip.fechaVacu = dayva + '/' + monthva + '/' + fechava.year;
  }else {
    descrip.fechaVacu = undefined;
  }
    descrip.dsPulso = this.historiaForm.value.pulso;
    descrip.dsReprod = this.historiaForm.value.reproductor;
    descrip.dsRespira = this.historiaForm.value.respiratorio;
    descrip.dsSegu = this.historiaForm.value.segui;
    descrip.dsTemperamento = this.historiaForm.value.temperamento;
    descrip.dsTemperatura = this.historiaForm.value.temperatura;
    descrip.dsTerapeu = this.historiaForm.value.terapeu;
    descrip.dsTllc = this.historiaForm.value.tllc;
    descrip.dsUri = this.historiaForm.value.urinario;
    descrip.dsVivienda = this.historiaForm.value.tipoVivienda;
    descrip.nmMascota = this.historiaForm.value.cantidadMascota === '' ? 0 : this.historiaForm.value.cantidadMascota;
    return descrip;

  }
  buildHistoriaClinica(){
    const historiaClinica = new HistoriaClinica();
    historiaClinica.cdHistoria = this.historiaClinica ? this.historiaClinica.cdHistoria : 0;
    historiaClinica.cdMascota =  this.historiaClinica ? this.historiaClinica.cdMascota : this.cc;
    historiaClinica.cdUsuario =  this.historiaClinica ? this.historiaClinica.cdUsuario : this.userActived.usuario;
    return historiaClinica;
  }
  submit(){
    this.historiaService.orquestador(this.buildHistoriaRequest()).subscribe(data => {
      this.getComplemento();
      this.getDiferencial();
      this.getMaestra();
      this.getProblema();
      this.getProducto();
      this.historiaClinicaSelectd = data as HistoriaClinicaRequest;
      this.historiaClinica = this.historiaClinicaSelectd.historiaClinica;
      this.descripHistoria = this.historiaClinicaSelectd.desccripHistoria;
      this.detalleTabla = this.historiaClinicaSelectd.detalleTablas;
      this.formu = true;
      this.setValues();
      this.messageError = null;
      this.messageSucesfull = 'Se ha creado o actualizado exitosamente la historia clínica';
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
  getComplemento(){
    this.historiaService.getComplemento().subscribe(data => {
      this.complemento = data;
    });
  }
  getDiferencial(){
    this.historiaService.getDiferencial().subscribe(data => {
      this.diferencia = data;
    });
  }
  getMaestra(){
    this.historiaService.getMaestra().subscribe(data => {
      this.maestra = data;
    });
  }
  getProblema(){
    this.historiaService.getproblema().subscribe(data => {
      this.problema = data;
    });
  }
  getProducto(){
    this.maetService.getProducto().subscribe(data => {
      this.producto = data;
    });
  }
  validProblemas(i , nombre){
    if (this.arrayTabla.controls[i].get(nombre + 'Select').value !== 'Selección') {
      this.arrayTabla.controls[i].get(nombre).disable();
      this.arrayTabla.controls[i].get(nombre + 'Select').enable();
    }
    if (this.arrayTabla.controls[i].get(nombre).value) {
      this.arrayTabla.controls[i].get(nombre + 'Select').disable();
      this.arrayTabla.controls[i].get(nombre).enable();
      this.validProduct = false;
    }
    if (this.arrayTabla.controls[i].get(nombre + 'Select').value === 'Selección' && !this.arrayTabla.controls[i].get(nombre).value){
      this.arrayTabla.controls[i].get(nombre).enable();
      this.arrayTabla.controls[i].get(nombre + 'Select').enable();
    }
  }
  getAll(){
    this.historiaService.getByHistoria(this.cd).subscribe(data => {
      this.historiaClinicaSelectd = data as HistoriaClinicaRequest;
      this.historiaClinica = this.historiaClinicaSelectd.historiaClinica;
      this.descripHistoria = this.historiaClinicaSelectd.desccripHistoria;
      this.detalleTabla = this.historiaClinicaSelectd.detalleTablas;
      this.seguiHistoria = this.historiaClinicaSelectd.seguimientoHistoria;
      this.formu = true;
      if (this.descripHistoria){
        this.setValues();
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
  setValues(){
    this.cdHistoria = this.historiaClinica.cdHistoria;
    this.historiaForm.patchValue({tipoVivienda: this.descripHistoria.dsVivienda, cantidadMascota: this.descripHistoria.nmMascota,
      fechaDes: this.descripHistoria.fechaDes, fechaVacu: this.descripHistoria.fechaVacu ,
      elegirVacu: this.descripHistoria.fechaVacu ? 'Si' : 'No',
      elegirDes: this.descripHistoria.fechaDes ? 'Si' : 'No',
      alimento: this.descripHistoria.dsAlimento,
      frecuencia: this.descripHistoria.dsFrecuencia,
      reproductivo: this.descripHistoria.dsReproductivo,
      tratamientos: this.descripHistoria.dsTratamientos,
      enfermedades: this.descripHistoria.dsEnfermedades,
      cirugias: this.descripHistoria.dsCirugias, motivo: this.descripHistoria.dsMotivo, temperatura: this.descripHistoria.dsTemperatura,
      temperamento: this.descripHistoria.dsTemperamento, peso: this.descripHistoria.dsPeso, fc: this.descripHistoria.dsFc,
      fr: this.descripHistoria.dsFr, tllc: this.descripHistoria.dsTllc, mm: this.descripHistoria.dsMm, pulso: this.descripHistoria.dsPulso,
      actitud: this.descripHistoria.dsActitud, hidratacion: this.descripHistoria.dsHidratacion, nervioso: this.descripHistoria.dsNervioso,
      piel: this.descripHistoria.dsPiel, muscu: this.descripHistoria.dsMuscu, respiratorio: this.descripHistoria.dsRespira,
      cardiovacular: this.descripHistoria.dsCardio, digestivo: this.descripHistoria.dsDiges, urinario: this.descripHistoria.dsUri,
      linofoi: this.descripHistoria.dsLinfoi, reproductor: this.descripHistoria.dsReprod, ojos: this.descripHistoria.dsOjos,
      oidos: this.descripHistoria.dsOidos, hallaz: this.descripHistoria.dsHallaz, detalle: this.descripHistoria.dsConsulta,
      terapeu: this.descripHistoria.dsTerapeu, segui: this.descripHistoria.dsSegu
        });
    if (this.detalleTabla) {
      this.arrayTabla = new FormArray([]);
      let index = 0;
      this.detalleTabla.forEach(data => {
        this.formGruoup = new FormGroup({
          problema: new FormControl(''),
          problemaSelect: new FormControl(data.dsProblema ? data.dsProblema : 'Selección' ),
          maestra: new FormControl(''),
          maestraSelect: new FormControl(data.dsMaestra ? data.dsMaestra : 'Selección'),
          diferencial: new FormControl(''),
          diferencialSelect: new FormControl(data.dsDiferencial ? data.dsDiferencial : 'Selección'),
          complemen: new FormControl(''),
          complemenSelect: new FormControl(data.dsComplementa ? data.dsComplementa : 'Selección'),
         });
        this.arrayTabla.push(this.formGruoup);
        this.validProblemas(index, 'problema');
        this.validProblemas(index, 'maestra');
        this.validProblemas(index, 'diferencial');
        this.validProblemas(index, 'complemen');
        index++;
      });
    }
  }
  volver(){
    this.route.navigate(['/mascotas', {cc : this.cc}]);
  }
  printDoc() {
    this.historiaService.getPdfHistoria(this.cdHistoria,this.mascota.cdidentificacion).subscribe(data => {
      console.log(data);
    });
  }
  seguiPass(seguimientopass,i){
    this.seguimiento = seguimientopass;
    this.index = i;
  }
  recieve(response){
    var seguiNew = new SeguimienoHistoria();
    seguiNew.cdHistoria = this.historiaClinicaSelectd.historiaClinica.cdHistoria; ;
    seguiNew.cdSeguimiento = response.cdSeguimiento;
    seguiNew.cdUsuario = response.cdUsuario;
    seguiNew.descripcion = response.descripcion;
    seguiNew.fecha = response.fecha;
    if (response.index === -1) {
      this.seguiHistoria.push(seguiNew);
    }else{
      this.seguiHistoria[response.index] =seguiNew;
    }
  }
}
