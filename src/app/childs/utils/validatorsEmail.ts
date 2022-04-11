import { AbstractControl } from '@angular/forms';

export function validatorsEmail(control: AbstractControl) {
    const patter = new RegExp('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$');
    if (patter.test(control.value)){
        return null;
    }else{
    return { emailError: true};
    }
}
