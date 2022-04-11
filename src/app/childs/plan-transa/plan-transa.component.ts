import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PlanHuellasTransa } from 'src/app/model/planhuellasTransa';
import { PlanhuellasTransaService } from 'src/app/service/planhuellastransa/planhuellasTransa.service';

@Component({
  selector: 'app-plan-transa',
  templateUrl: './plan-transa.component.html',
  styleUrls: ['./plan-transa.component.css']
})
export class PlanTransaComponent implements OnInit {
  messageSucesfull;
  messageError;
  minDate = {year: 1990, month: 1, day: 1};
  maxDate = {year: 2200, month: 12, day: 1 };
  model: NgbDateStruct;
  planhuellasTransaForm: FormGroup;
  @Input() cdPlan;
  @Output() save: EventEmitter<string> = new EventEmitter();

  constructor(private planTransaServices: PlanhuellasTransaService) { }
  
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.planhuellasTransaForm = new FormGroup({
      tipo: new FormControl('0', Validators.required),
      valor: new FormControl('', Validators.required),
      fecha: new FormControl('',Validators.required),
      descripcion: new FormControl('', Validators.required)
    });
  }
  guardar(){
    var planHuellasTransa = new PlanHuellasTransa();
    planHuellasTransa.cdPlanHuellas = this.cdPlan;
    planHuellasTransa.cdPlanHuellasTransas = 0;
    planHuellasTransa.descripcion = this.planhuellasTransaForm.get("descripcion").value;
    planHuellasTransa.tipoOperacion = this.planhuellasTransaForm.get("tipo").value;
    planHuellasTransa.valor = this.planhuellasTransaForm.get("valor").value;
    planHuellasTransa.fechaOperacion = this.planhuellasTransaForm.get("fecha").value;
    this.planTransaServices.create(planHuellasTransa).subscribe(data => {
      this.sendInfo();
      this.messageError = null;
      this.messageSucesfull = 'La transación se ha guardado correctamente';
      const promise = new Promise( (resolve, reject) => {
        setTimeout( () => {
          this.messageSucesfull = null;
          resolve();
        }, 4000);
      });
    }, error => {
      this.messageSucesfull = null;
      this.messageError = 'Ocurrió un error al guardar la transación, Intente nuevamente o comuníquese con su administrador';
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
