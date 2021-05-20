import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ProjectService} from '../../../shared/services/components/project.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../shared/models/project';
import {Response} from '../../../shared/models/response';
import {UserService} from '../../../shared/services/components/user.service';
import {User} from '../../../shared/models/user';
import {Location} from '@angular/common';

@Component({
  selector: 'app-projet-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public users: User[];

  private subscription: Subscription = new Subscription();

  public isAddMode: boolean;

  public projectCode: string;

  @Output() loadPage = new EventEmitter<void>();


  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute,
              private userService: UserService, private location: Location) {
  }

  ngOnInit(): void {
    this.projectCode = this.activatedRoute.snapshot.params.id;
    this.isAddMode = !this.projectCode;
    this.initForm();
    this.initManagers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      projectName: new FormControl(null, [Validators.required]),
      projectCode: new FormControl(null, [Validators.required]),
      assignedManager: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      projectDetail: new FormControl(null),
      projectStatus: new FormControl(this.isAddMode ? 'OPEN' : null)
    });

    if (!this.isAddMode) {
      this.subscription.add(this.projectService.readByCode(this.projectCode)
        .subscribe(x => this.form.patchValue(x.data)));
    }
  }

  initManagers(): void {
    this.userService.readByRole('Manager').subscribe((response: Response<any>) => {
      if (response.success) {
        this.users = response.data;
      }
    });
  }

  public onSubmit(): void {

    if (this.form.invalid) {
      return;
    }

    this.isAddMode ? this.createProject() : this.updateProject();
  }


  private createProject(): void {
    const project = this.form.value as Project;

    const request = this.projectService.createProject(project).subscribe((response: Response<any>) => {
      if (response.success) {
        this.loadPage.emit();
      }
    });

    this.subscription.add(request);
  }

  private updateProject(): void {
    const project = this.form.value as Project;

    const request = this.projectService.updateProject(project).subscribe((response: Response<any>) => {
      if (response.success) {
        this.loadPage.emit();
        this.form.reset();
        this.location.go('/member/projects');
      }
    });

    this.subscription.add(request);
  }
}
