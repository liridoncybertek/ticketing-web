import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Request} from '../../models/request';
import {Observable} from 'rxjs';
import {Response} from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class GatewayService<T = any> {

  private endpoint = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  create({path, body, options}: Request): Observable<Response<T> | any> {

    const endpoint = options && options.skipToken ? `${this.endpoint}${path}` : `${this.endpoint}/${environment.api}/${environment.apiVersion}${path}`;

    return this.http.post<T>(endpoint, body, options);
  }

  public read({path, options}: Request): Observable<Response<T> | any> {
    const endpoint = options && options.skipToken ? `${this.endpoint}${path}` : `${this.endpoint}/${environment.api}/${environment.apiVersion}${path}`;
    return this.http.get<T>(endpoint, options);
  }

  public update({path, body, options}: Request): Observable<Response<T> | any> {

    return this.http.put<T>(`${this.endpoint}${path}`, body, options);
  }

}
