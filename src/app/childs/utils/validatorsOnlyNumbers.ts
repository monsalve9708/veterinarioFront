import { AbstractControl } from '@angular/forms';

export function validatorNoString(control: AbstractControl) {
    const patter = new RegExp('^[0-9]*$');
    if (patter.test(control.value)){
        return null;
    }else{
    return { stringError: true};
    }
}
