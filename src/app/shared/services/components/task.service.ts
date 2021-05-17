import { Injectable } from '@angular/core';
import {GatewayService} from '../general/gateway.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private gatewayService: GatewayService) { }
}
