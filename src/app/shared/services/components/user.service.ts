import {Injectable} from '@angular/core';
import {GatewayService} from '../general/gateway.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private gatewayService: GatewayService) {
  }

  public readByUsername(username: string): Observable<any> {
    const request = {
      path: `/user/${username}`,
    };

    return this.gatewayService.read(request).pipe(map(response => {
      return response;
    }));
  }
}
