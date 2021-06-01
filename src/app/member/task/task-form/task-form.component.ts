import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/models/user';
import {Subscription} from 'rxjs';
import {TaskService} from '../../../shared/services/components/task.service';
import {ProjectService} from '../../../shared/services/components/project.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/services/components/user.service';
import {Location} from '@angular/common';
import {Task} from '../../../shared/models/task';
import {Response} from '../../../shared/models/response';
import {Project} from '../../../shared/models/project';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public users: User[];
  public projects: Project[];
  public selectedProject: Project;
  private subscription: Subscription = new Subscription();
  public isAddMode: boolean;
  public id: number;
  @Output() loadPage = new EventEmitter<void>();

  constructor(private taskService: TaskService, private projectService: ProjectService,
              private activatedRoute: ActivatedRoute, private userService: UserService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.isAddMode = !this.id;
    this.initEmployees();
    this.initProjects();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      project: new FormControl(null, [Validators.required]),
      assignedEmployee: new FormControl(null, [Validators.required]),
      taskSubject: new FormControl(null, [Validators.required]),
      taskDetail: new FormControl(null),
      taskStatus: new FormControl(this.isAddMode ? 'OPEN' : null),
      assignedDate: new FormControl(null),
    });

    if (!this.isAddMode) {
      this.subscription.add(this.taskService.readById(this.id)
        .subscribe(x => {
          console.log(x.data);
          this.selectedProject = x.data.project;
          this.form.patchValue(x.data);
        }));
    }
  }

  private initEmployees(): void {
    const request = this.userService.readByRole('Employee').subscribe((response: Response<any>) => {
      if (response.success) {
        this.users = response.data;
      }
    });

    this.subscription.add(request);
  }

  public onSubmit(): void {

    if (this.form.invalid) {
      return;
    }

    this.isAddMode ? this.createTask() : this.updateTask();
  }

  private initProjects(): void {
    const request = this.projectService.readNonCompletedProjects().subscribe((response: Response<any>) => {
      if (response.success) {
        this.projects = response.data;
      }
    });

    this.subscription.add(request);
  }

  private createTask(): void {
    const task = this.form.value as Task;
    const request = this.taskService.createTask(task).subscribe((response: Response<any>) => {
      if (response.success) {
        this.loadPage.emit();
      }
    });

    this.subscription.add(request);
  }

  private updateTask(): void {
    const task = this.form.value as Task;
    const request = this.taskService.updateTask(task).subscribe((response: Response<any>) => {
      if (response.success) {
        this.loadPage.emit();
        this.form.reset();
        this.location.go('/member/tasks');
      }
    });

    this.subscription.add(request);
  }

  setSelectedValue(o1: any, o2: any): boolean {
    return o1 && o2 && o1.id === o2.id;
  }
}
