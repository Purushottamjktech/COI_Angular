import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this._authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        
        if(!user){
            return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token!),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
