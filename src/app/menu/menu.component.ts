import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  infoUser;
  getInfo;
  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (!this.getInfo){
      this.getInfo = JSON.parse(sessionStorage.getItem('usuario'));
    }
    if (this.getInfo){
      this.infoUser = this.getInfo;
    }
  }
  logout(){
    this.loginService.logout();
    this.router.navigateByUrl('/login');
    swal('Se ha cerrado sesión correctamente', '', 'success');
  }

}
