import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Request} from '../models/request';
import {Observable} from 'rxjs';
import {Response} from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class GatewayService<T = any> {

  private endpoint = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  create({path, body, queryParams}: Request, options?: any): Observable<Response<T> | any> {
    const endpoint = this.appendQueryParams(`${this.endpoint}${path}`, queryParams);

    return this.http.post<T>(endpoint, body, options);
  }

  public read({path, queryParams}: Request, options?: any): Observable<Response<T> | any> {

    const endpoint = this.appendQueryParams(`${this.endpoint}${path}`, queryParams);

    return this.http.get<T>(endpoint, options);
  }

  public update({path, body, queryParams}: Request, options?: any): Observable<Response<T> | any> {

    const endpoint = this.appendQueryParams(`${this.endpoint}${path}`, queryParams);

    return this.http.put<T>(endpoint, body, options);
  }

  private appendQueryParams(url: string, queryParams: string[] = []): string {
    if (!queryParams.length) {
      return url;
    }

    return url + '?' + queryParams.join('&');
  }
}
