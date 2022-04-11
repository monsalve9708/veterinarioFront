import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, Form, FormBuilder, Validators, FormControl, EmailValidator } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { validatorNoString } from '../../utils/validatorsOnlyNumbers';
import { validatorsEmail } from '../../utils/validatorsEmail';
import { LoginService } from 'src/app/service/login/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  usuario = '';
  createSuccess = false;
  createFail = false;
  tipoVete = false;
  tipoCliente = true;
  errorUser = false;
  user: Usuario;
  sw = false;
  cc;
  constructor(private usuarioService: UsuarioService, public loginService: LoginService,private routeActi: ActivatedRoute) { }

  ngOnInit(): void {
    this.inciarForm();
    this.cc = this.routeActi.snapshot.paramMap.get('cc');
    if (this.cc) {
      this.getUSuario();
    }
  }
  getUSuario(){
    this.usuarioService.getByIdentificacion(this.cc).subscribe(data => {
      this.initFormUser(data  as Usuario);
      this.sw = true;
      console.log(this.usuarioForm);
      
    });
  }
  initFormUser(data){
this.usuarioForm.patchValue({
  nombre: data.nombre,
  apellido: data.apellido,
  identificacion: Number(data.identificacion),
  email: data.email,
  direccion: data.direccion,
  telefono: Number(data.telefono),
  tipousu: data.tipoUsu,
  matricula: data.matricula == undefined ? '' : data.matricula,
  contraseña : 0,
  conficontraseña: 0

});
  }
  inciarForm(){
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      identificacion: new FormControl('', [Validators.required, validatorNoString]),
      email: new FormControl('', [Validators.required, validatorsEmail]),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', [Validators.required, validatorNoString]),
      tipousu: new FormControl('Cliente', Validators.required),
      contraseña: new FormControl(''),
      conficontraseña: new FormControl(''),
      matricula: new FormControl('')
    });
  }
  confirmaContra(){
    if (this.usuarioForm.value.contraseña !== this.usuarioForm.value.conficontraseña) {
      this.usuarioForm.get('contraseña').setValidators(Validators.maxLength(-1));
      this.usuarioForm.get('contraseña').updateValueAndValidity();
    }else{
      this.usuarioForm.get('contraseña').clearValidators();
      this.usuarioForm.get('contraseña').setValidators(Validators.required);
      this.usuarioForm.get('contraseña').updateValueAndValidity();
    }
  }
  createUsuario(){
    const usuario = new Usuario();
    usuario.nombre = this.usuarioForm.value.nombre;
    usuario.apellido = this.usuarioForm.value.apellido;
    usuario.identificacion = this.usuarioForm.value.identificacion;
    usuario.email = this.usuarioForm.value.email;
    usuario.direccion = this.usuarioForm.value.direccion;
    usuario.telefono = this.usuarioForm.value.telefono;
    usuario.tipouser = this.usuarioForm.value.tipousu;
    usuario.usuario = this.usuario;
    usuario.contraseña = this.usuarioForm.value.contraseña;
    usuario.matricula = this.usuarioForm.value.matricula;
    usuario.sw = this.sw;
    this.usuarioService.createUsuario(usuario).subscribe(data => {
    this.createSuccess = true;
    const promise = new Promise( (resolve, reject) => {
      window.scroll(0, 0);
      setTimeout( () => {
        this.createSuccess = false;
        this.inciarForm();
        this.usuario = '';
        resolve();
      }, 5000);
    });
  },
  error => {
    this.createFail = true;
    const promise = new Promise( (resolve, reject) => {
    setTimeout( () => {
      this.createFail = false;
      resolve();
    }, 5000);
  });
});
  }
  changeTipoUsuario(){
    if (this.usuarioForm.value.tipousu === 'Cliente'){
      this.tipoCliente = true;
      this.usuarioForm.get('contraseña').clearValidators();
      this.usuarioForm.get('contraseña').updateValueAndValidity();
      this.usuarioForm.get('conficontraseña').clearValidators();
      this.usuarioForm.get('conficontraseña').updateValueAndValidity();
      this.usuarioForm.get('matricula').clearValidators();
      this.usuarioForm.get('matricula').updateValueAndValidity();

    }else {
      this.tipoCliente = false;
      this.usuarioForm.get('contraseña').setValidators(Validators.required);
      this.usuarioForm.get('contraseña').updateValueAndValidity();
      this.usuarioForm.get('conficontraseña').setValidators(Validators.required);
      this.usuarioForm.get('conficontraseña').updateValueAndValidity();
      this.usuarioForm.get('matricula').setValidators(Validators.required);
      this.usuarioForm.get('matricula').updateValueAndValidity();
    }
    if (this.usuarioForm.value.tipousu === 'Veterinario'){
      this.tipoVete = true;
    }else {
      this.tipoVete = false;
      this.usuarioForm.get('matricula').clearValidators();
      this.usuarioForm.get('matricula').updateValueAndValidity();
    }
  }
  generateUsuario(cdusuario?){
    if (cdusuario === undefined && !this.sw ){
    if (this.usuarioForm.value.nombre !== '' && this.usuarioForm.value.nombre !== undefined &&
       this.usuarioForm.value.apellido !== undefined && this.usuarioForm.value.apellido !== ''){

         const nombre: string = this.usuarioForm.value.nombre;
         const apellido: string = this.usuarioForm.value.apellido;
         const responseNombre = nombre.split(' ');
         const responseApellido = apellido.split(' ');
         this.usuario = (responseNombre[0] + responseApellido[0]).toLowerCase();
         this.verificacionByCdusuario(this.usuario);
        }
    }
    this.verificacionByCdusuario(cdusuario);
  }
  verificacion(){
    return this.usuarioService.verificaUsuario(this.usuarioForm.value.identificacion).subscribe(data => {
      this.errorUser = false;
    },
    error => {
      if (error.status === 400 && this.sw) {
        this.errorUser = true;
      }
    });
  }
  verificacionByCdusuario(cdUsuario){
    return this.usuarioService.verificaUsuarioByCdUsuario(cdUsuario).subscribe(data => {
    },
    error => {
      if (error.status === 400){
        this.usuario = this.usuario + (Math.floor(Math.random() * (100 - 1)) + 1);
        this.generateUsuario(this.usuario);
      }
    } );
  }
}
