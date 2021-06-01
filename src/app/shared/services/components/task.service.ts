import {Injectable} from '@angular/core';
import {GatewayService} from '../general/gateway.service';
import {Observable} from 'rxjs';
import {Project} from '../../models/project';
import {Task} from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private gatewayService: GatewayService) {

  }

  public read(): Observable<any> {
    const request = {
      path: `/task`,
    };

    return this.gatewayService.read(request);
  }

  public readById(id: number): Observable<any> {
    const request = {
      path: `/task/${id}`,
    };

    return this.gatewayService.read(request);
  }

  public createTask(task: Task): Observable<any> {
    const request = {
      path: '/task',
      body: task,
    };
    return this.gatewayService.create(request);
  }

  public updateTask(task: Task): Observable<any> {
    const request = {
      path: '/task',
      body: task,
    };
    return this.gatewayService.update(request);
  }

  public delete(id: number): Observable<any> {
    const request = {
      path: `/task/${id}`,
    };

    return this.gatewayService.delete(request);
  }

  public readNonCompletedTasks(): Observable<any> {
    const request = {
      path: `/task/employee`,
    };

    return this.gatewayService.read(request);
  }

  public readAllByProjectManager(): Observable<any> {
    const request = {
      path: `/task/project-manager`,
    };

    return this.gatewayService.read(request);
  }

  public employeeUpdateTask(task: Task): Observable<any> {
    const request = {
      path: '/task/employee/update',
      body: task,
    };
    return this.gatewayService.update(request);
  }

}
