import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../services/general/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenService = this.tokenService;

    if (!tokenService.isTokenExpired()) {
      request = request.clone({
        setHeaders: {
          Authorization: tokenService.getToken()
        }
      });
    }

    return next.handle(request);
  }
}
