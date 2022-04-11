import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  constructor(private loginServices: LoginService, private route: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginServices.isAuthenticated()){
        if (this.isTokenExpirado()){
          this.loginServices.logout();
          this.route.navigateByUrl('/login');
          return false;
        }
        return true;
      }
      this.route.navigateByUrl('/login');
      return false;
  }
  isTokenExpirado(): boolean{
    const token = sessionStorage.getItem('token');
    const payload = this.loginServices.obtenerDatosToken(token);
    const now = new Date().getTime() / 1000;
    if (payload.exp < now){
      return true;
    }
    return false;
  }
}
