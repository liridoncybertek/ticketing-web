import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../../shared/models/task';
import {Subscription} from 'rxjs';
import {TaskService} from '../../../shared/services/components/task.service';
import {Response} from '../../../shared/models/response';

@Component({
  selector: 'app-employee-task',
  templateUrl: './employee-task.component.html',
  styleUrls: ['./employee-task.component.scss']
})
export class EmployeeTaskComponent implements OnInit, OnDestroy {

  tasks: Task[];
  private subscription: Subscription = new Subscription();
  displayedColumns: string[] = ['project', 'taskSubject', 'employee', 'date', 'status', 'actions'];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.readTasks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  readTasks(): void {
    this.taskService.readNonCompletedTasks().subscribe((response: Response<any>) => {
      if (response.success) {
        this.tasks = response.data;
      }
    });
  }
}
