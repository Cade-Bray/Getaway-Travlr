import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Injectable, Provider} from '@angular/core';
import {Observable} from 'rxjs';
import {Authentication} from '../services/authentication';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: Authentication) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var isAuthAPI: boolean;

    // API calls that require auth
    isAuthAPI =
      req.url.startsWith('login') ||
      req.url.startsWith('register');

    if (this.authenticationService.isLoggedIn() && !isAuthAPI){
      let token = this.authenticationService.getToken();
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
