import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/models/user';
import {Subscription} from 'rxjs';
import {TaskService} from '../../../shared/services/components/task.service';
import {ProjectService} from '../../../shared/services/components/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/services/components/user.service';
import {Location} from '@angular/common';
import {Task} from '../../../shared/models/task';
import {Response} from '../../../shared/models/response';
import {Project} from '../../../shared/models/project';
import {Status} from '../../../shared/enums/status';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public users: User[];
  public projects: Project[];
  private subscription: Subscription = new Subscription();
  public isAddMode: boolean;
  public id: number;
  public isEmployee: boolean;
  public statuses: any[];
  @Output() loadPage = new EventEmitter<void>();

  constructor(private taskService: TaskService, private projectService: ProjectService,
              private activatedRoute: ActivatedRoute, private userService: UserService,
              private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.statuses = Object.keys(Status).map(key => Status[key]);
    this.id = this.activatedRoute.snapshot.params.id;
    this.isEmployee = this.activatedRoute.snapshot.params.isEmployee;

    this.isAddMode = !this.id;
    if (!this.isEmployee) {
      this.initEmployees();
      this.initProjects();
    }

    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      project: new FormControl({value: null, disabled: this.isEmployee}, [Validators.required]),
      assignedEmployee: new FormControl({value: null, disabled: this.isEmployee}, [Validators.required]),
      taskSubject: new FormControl({value: null, disabled: this.isEmployee}, [Validators.required]),
      taskDetail: new FormControl({value: null, disabled: this.isEmployee}),
      taskStatus: new FormControl(this.isAddMode ? 'OPEN' : null),
      assignedDate: new FormControl({value: null, disabled: this.isEmployee}),
    });

    if (!this.isAddMode) {
      this.subscription.add(this.taskService.readById(this.id)
        .subscribe(x => this.form.patchValue(x.data)));
    }
  }

  getProject(): Project {
    return this.form.controls.project.value;
  }

  getAssignedEmployee(): User {
    return this.form.controls.assignedEmployee.value;
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

    let request = this.taskService.updateTask(task);

    if (this.isEmployee) {
      request = this.taskService.employeeUpdateTask(task);
    }


    const subsricptionRequest = request.subscribe((response: Response<any>) => {
      if (response.success) {
        if (this.isEmployee) {
          this.router.navigateByUrl('/member/task/employee');
        }
        this.loadPage.emit();
        this.form.reset();
        this.location.go('/member/tasks');
      }
    });

    this.subscription.add(subsricptionRequest);
  }

  setSelectedValue(o1: any, o2: any): boolean {
    return o1 && o2 && o1.id === o2.id;
  }
}
