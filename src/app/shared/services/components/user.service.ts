import {Injectable} from '@angular/core';
import {GatewayService} from '../general/gateway.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private gatewayService: GatewayService) {
  }

  public read(): Observable<any> {
    const request = {
      path: `/user`,
    };

    return this.gatewayService.read(request);
  }

  public readByUsername(username: string): Observable<any> {
    const request = {
      path: `/user/${username}`,
    };

    return this.gatewayService.read(request);
  }

  public createUser(user: User): Observable<any> {
    const request = {
      path: '/user/create-user',
      body: user,
    };
    return this.gatewayService.create(request);
  }

  public updateUser(user: User): Observable<any> {
    const request = {
      path: '/user',
      body: user,
    };
    return this.gatewayService.update(request);
  }
}
