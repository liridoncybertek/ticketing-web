import {Injectable} from '@angular/core';
import {GatewayService} from '../general/gateway.service';
import {Observable} from 'rxjs';
import {Project} from '../../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private gatewayService: GatewayService) {
  }

  public read(): Observable<any> {
    const request = {
      path: `/project`,
    };

    return this.gatewayService.read(request);
  }

  public readByCode(code: string): Observable<any> {
    const request = {
      path: `/project/${code}`,
    };

    return this.gatewayService.read(request);
  }

  public createProject(project: Project): Observable<any> {
    const request = {
      path: '/project',
      body: project,
    };
    return this.gatewayService.create(request);
  }

  public updateProject(project: Project): Observable<any> {
    const request = {
      path: '/project',
      body: project,
    };
    return this.gatewayService.update(request);
  }

  public delete(code: string): Observable<any> {
    const request = {
      path: `/project/${code}`,
    };

    return this.gatewayService.delete(request);
  }

  public complete(code: string): Observable<any> {
    const request = {
      path: `/project/complete/${code}`,
    };

    return this.gatewayService.update(request);
  }

  public readWithDetails(): Observable<any> {

    const request = {
      path: '/project/details'
    };

    return this.gatewayService.read(request);
  }
}
