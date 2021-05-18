import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { ProjectFormComponent } from './project/projet-form/project-form.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from '@angular/material/radio';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [MemberComponent, ProjectComponent, TaskComponent, UserComponent,
    UserFormComponent, UserDetailsComponent, ProjectFormComponent, ProjectDetailsComponent,
    TaskFormComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class MemberModule { }
