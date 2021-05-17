import {Injectable} from '@angular/core';
import {GatewayService} from './gateway.service';
import {AuthenticationRequest} from '../models/authenticationRequest';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TokenService} from './token.service';
import {Constants} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private gatewayService: GatewayService, private tokenService: TokenService) {
  }

  public login(user: AuthenticationRequest): Observable<any> {

    const request = {
      path: '/authenticate',
      body: user,
      options: {skipToken: true}
    };

    return this.gatewayService.create(request).pipe(map(response => {
      if (response.success) {
        this.tokenService.setToken(Constants.ACCESS_TOKEN, response.data);
      }

      return response;
    }));
  }
}
