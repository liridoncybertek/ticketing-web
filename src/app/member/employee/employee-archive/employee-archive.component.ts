import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../../../shared/services/components/task.service';
import {Task} from '../../../shared/models/task';
import {Subscription} from 'rxjs';
import {Response} from '../../../shared/models/response';

@Component({
  selector: 'app-employee-archive',
  templateUrl: './employee-archive.component.html',
  styleUrls: ['./employee-archive.component.scss']
})
export class EmployeeArchiveComponent implements OnInit, OnDestroy {

  tasks: Task[];
  private subscription: Subscription = new Subscription();
  displayedColumns: string[] = ['project', 'taskSubject', 'employee', 'date', 'status'];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.readTasks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  readTasks(): void {
    this.taskService.readCompletedTasks().subscribe((response: Response<any>) => {
      if (response.success) {
        this.tasks = response.data;
      }
    });
  }

}
