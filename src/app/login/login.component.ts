import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Login } from '../model/login';
import {  Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  loginSave = new Login();
  validError = false;
  validLogin = false;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  initFor(){
    this.login = this.formBuilder.group({
      usuario: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required)
    });
  }
  ngOnInit(): void {
    if (this.loginService.isAuthenticated()){
      this.redirect();
      swal('Ya estas autenticado', '', 'success');
    }
    this.initFor();
  }
  authentic(){
    this.loginSave.usuario = this.login.value.usuario;
    this.loginSave.contraseña = this.login.value.contraseña;
    this.loginService.authorization(this.loginSave).subscribe(data => {
      if (data){
        this.validLogin = false;
        this.loginService.guardarUsuario(data.value);
        this.loginService.guardatToken(data.value);
        this.redirect();
      }
    },
    error => {
      if (error.status === 400){
        this.validLogin = true;
      }else {
      this.validError = true;
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.validError = false;
          resolve();
        }, 4000);
      });
    }
  });
  }
  redirect(){
    this.router.navigateByUrl('/mascotas');
  }
}
