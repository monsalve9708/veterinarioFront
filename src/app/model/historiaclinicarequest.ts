import { DescripHistoria } from './descriphistoria'
import { DetalleTabla } from './detalletabla';
import { HistoriaClinica } from './historiaclinica';
import { SeguimienoHistoria } from './seguimientohistoria';

export class HistoriaClinicaRequest{
    desccripHistoria: DescripHistoria;
    detalleTablas: Array<DetalleTabla>;
    seguimientoHistoria: Array<SeguimienoHistoria>;
    historiaClinica: HistoriaClinica;
}