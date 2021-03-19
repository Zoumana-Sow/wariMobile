import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { CanActivate } from '@angular/router';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }
    canActivate(): boolean  {
      if (this.authService.getToken() && (localStorage.getItem('roles').includes('ROLE_UserAgence')
        || localStorage.getItem('roles').includes('ROLE_AdminAgence'))){
        return true ;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    }
}
