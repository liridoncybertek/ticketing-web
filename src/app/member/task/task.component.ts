import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../shared/models/task';
import {Subscription} from 'rxjs';
import {TaskService} from '../../shared/services/components/task.service';
import {Response} from '../../shared/models/response';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  public tasks: Task[];
  displayedColumns: string[] = ['project', 'taskSubject', 'employee', 'date', 'status', 'actions'];
  private subscription: Subscription = new Subscription();

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.readTasks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  readTasks(): void {
    const request = this.taskService.read().subscribe((response: Response<any>) => {
      if (response.success) {
        this.tasks = response.data;
      }
    });

    this.subscription.add(request);
  }

  onDelete(id: number): void {

    if (!id) {
      return;
    }

    this.taskService.delete(id).subscribe(response => {
      console.log(response);
      if (response.success) {
        this.readTasks();
      }
    });
  }
}
