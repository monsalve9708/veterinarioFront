
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario/registro-usuario.component';
import { BusquedaMascotasComponent } from './busqueda-mascotas/busqueda-mascotas.component';
import { AddMascotaComponent } from './add-mascota/add-mascota.component';

import { RoleGuard } from '../guards/role.guard';
import { HistoriaComponent } from './historia/historia.component';
import { HistorialComponent } from './historial/historial.component';
import { PeluqueriaComponent } from './peluqueria/peluqueria.component';
import { ModalPeluqueriaComponent } from './modal-peluqueria/modal-peluqueria.component';
import { ModalFormulaComponent } from './modal-formula/modal-formula.component';
import { BusquedaUsuarioComponent } from './busqueda-usuario/busqueda-usuario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import { ModalSeguimientoComponent } from './modal-seguimiento/modal-seguimiento.component';
import { ModalPlanhuellasComponent } from './modal-planhuellas/modal-planhuellas.component';
import { PlanHuellasComponent } from './plan-huellas/plan-huellas.component';
import { PlanTransaComponent } from './plan-transa/plan-transa.component';


const busquedaMascotas: Routes = [
    {path: 'mascotas', component: BusquedaMascotasComponent, canActivate: [RoleGuard], data: {role: ['Administrador', 'Estilista', 'Veterinario', 'Auxiliar']}},
    {path: 'registro', component: RegistroUsuarioComponent,  canActivate: [RoleGuard], data: {role: ['Administrador', 'Estilista', 'Veterinario', 'Auxiliar']}},
    {path: 'historia', component: HistoriaComponent,  canActivate: [RoleGuard], data: {role: ['Administrador', 'Veterinario', 'Auxiliar']}},
    {path: 'historial', component: HistorialComponent,  canActivate: [RoleGuard], data: {role: ['Administrador', 'Veterinario',
     'Auxiliar']}},
    {path: 'peluqueria', component: PeluqueriaComponent,  canActivate: [RoleGuard], data: {role: ['Administrador', 'Estilista']}},
    {path: 'planhuellas', component: PlanHuellasComponent,  canActivate: [RoleGuard], data: {role: ['Administrador']}},
    {path: 'usuarios', component: BusquedaUsuarioComponent,  canActivate: [RoleGuard], data: {role: ['Administrador', 'Veterinario' , 'Auxiliar', 'Estilista']}}
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        RouterModule.forChild(busquedaMascotas)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        DatePipe
    ],
    declarations: [
        BusquedaMascotasComponent,
        RegistroUsuarioComponent,
        PlanHuellasComponent,
        AddMascotaComponent,
        HistoriaComponent,
        HistorialComponent,
        PeluqueriaComponent,
        ModalSeguimientoComponent,
        ModalPeluqueriaComponent,
        ModalFormulaComponent,
        ModalPlanhuellasComponent,
        BusquedaUsuarioComponent,
        FilterPipe,
        ModalSeguimientoComponent,
        ModalPlanhuellasComponent,
        PlanHuellasComponent,
        PlanTransaComponent
    ]
})
export class BusquedaMascotasModule {}
