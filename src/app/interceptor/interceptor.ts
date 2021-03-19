
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor{
  constructor(public tokenService: AuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    console.log(token);
    if ( token ) {
      const cloneReq = req.clone(
        {
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        }
      );
      return next.handle(cloneReq).pipe(
        catchError((err) => {
        if (err.status === 401 || err.status === 403){
          this.tokenService.deconnecte();
          // this.router.navigate(['/login']);
        }
        throw err;
      }
    )
    );
}else {
  return next.handle(req);
}
}
}

export const InterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: Interceptor,
  multi: true
};
