import { Injectable,Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authentication } from '../services/authentication';


@Injectable()
export class jwtInterceptor implements HttpInterceptor {

  constructor(
    private authentication: Authentication
  ) {}

  // middleware to send login and register routes through authentication
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var isAuthAPI: boolean;

    if (request.url.startsWith('login') ||
        request.url.startsWith('register')) {
          isAuthAPI = true;
    } else {
      isAuthAPI = false;
    }

    if (this.authentication.isLoggedIn() && !isAuthAPI) {
      // if user is logged in and the path is not login/register, set the authorization token and send the user through the auth middleware
      let token = this.authentication.getToken();
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }

};

// export the jwtinterceptor as a provider
export const authInterceptProvider: Provider =
  { provide: HTTP_INTERCEPTORS,
  useClass: jwtInterceptor, multi: true
  };
