import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let token = ''; // inicializa a variável com um valor vazio
    if (this.authService.isLoggedIn()) {
      token = this.authService.getToken();
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }
    console.log('Token: ', token);
    return next.handle(request);
  }
}