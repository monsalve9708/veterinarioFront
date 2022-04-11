import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanHuellas } from 'src/app/model/planhuellas';
import { PlanhuellasService } from 'src/app/service/planhuellas/planhuellas.service';

@Component({
  selector: 'app-modal-planhuellas',
  templateUrl: './modal-planhuellas.component.html',
  styleUrls: ['./modal-planhuellas.component.css']
})
export class ModalPlanhuellasComponent implements OnInit {
  planhuellasForm: FormGroup;
  @Output() save: EventEmitter<string> = new EventEmitter();
  @Input() cdCliente;
  userActived;
  messageSucesfull;
  messageError;
  constructor(private planHuellasServices: PlanhuellasService) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.planhuellasForm = new FormGroup({
      dia: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required)
    });
  }
  inscribir(){
    var plan = new PlanHuellas();
    plan.cdCliente = this.cdCliente;
    plan.cdPlanHuellas = 0;
    plan.cdUsuarioRegistro = JSON.parse(sessionStorage.getItem('usuario')).usuario;
    plan.diaPago = this.planhuellasForm.get("dia").value;
    plan.valorPactado = this.planhuellasForm.get("valor").value;
    this.planHuellasServices.create(plan).subscribe(data => {
      this.sendInfo();
      this.messageError = null;
      this.messageSucesfull = 'La inscripción se ha realizado correctamente';
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageSucesfull = null;
          resolve();
        }, 4000);
      });
    }, error => {
      this.messageSucesfull = null;
      this.messageError = 'Ocurrió un error al realizar la inscripción, Intente nuevamente o comuníquese con su administrador';
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageError = null;
          resolve();
        }, 5000);
      });
    });
  }
  sendInfo(){
    this.save.emit("");
  }
}
