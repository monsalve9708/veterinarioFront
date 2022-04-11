import { AbstractControl } from '@angular/forms';

export function validatorsSelect(control: AbstractControl){
    if (control.value !== 'Selección'){
        return null;
    }
    else {
        return {errorSelect: true};
    }
}
