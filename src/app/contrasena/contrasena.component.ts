import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario/usuario.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.css']
})
export class ContrasenaComponent implements OnInit {
  cambioForm: FormGroup;
  messageError;
  messageSucesfull;
  usuario = new Usuario();
  constructor(private usuarioServices: UsuarioService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.cambioForm = this.formBuilder.group({
      usuario: new FormControl('', Validators.required),
      contra: new FormControl('', Validators.required),
      confirm: new FormControl('', Validators.required),
    });
  }
  confirmaContra(){
    if (this.cambioForm.value.contra !== this.cambioForm.value.confirm) {
      this.cambioForm.get('contra').setValidators(Validators.maxLength(-1));
      this.cambioForm.get('contra').updateValueAndValidity();
    }else{
      this.cambioForm.get('contra').clearValidators();
      this.cambioForm.get('contra').setValidators(Validators.required);
      this.cambioForm.get('contra').updateValueAndValidity();
    }
  }
  submit(){
    this.usuario.apellido = '';
    this.usuario.contraseña = this.cambioForm.value.contra;
    this.usuario.direccion = '';
    this.usuario.email = '';
    this.usuario.identificacion = '';
    this.usuario.matricula = '';
    this.usuario.nombre = '';
    this.usuario.telefono = '';
    this.usuario.tipouser = '';
    this.usuario.usuario = this.cambioForm.value.usuario;
    this.change();
  }
  change(){
    this.usuarioServices.change(this.usuario).subscribe(data => {
      this.messageError = null;
      this.messageSucesfull = 'Se ha cambiado la contraseña exitosamente';
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
}
