import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login/login.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private loginServices: LoginService, private route: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = next.data['role'] as string;
      if (!this.loginServices.isAuthenticated()){
        this.route.navigateByUrl('/login');
        return false;
      }
      if (this.loginServices.hasRole(role[0], role[1], role[2], role[3])){
        return true;
      }
      swal('No tienes acceso a esta url', '', 'error');
      this.route.navigateByUrl('/mascotas');
      return false;
  }
}
