import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemberComponent} from './member.component';
import {ProjectComponent} from './project/project.component';
import {TaskComponent} from './task/task.component';
import {UserComponent} from './user/user.component';
import {RoleGuard} from '../shared/services/guards/role.guard';
import {ProjectFormComponent} from './project/projet-form/project-form.component';
import {ProjectDetailsComponent} from './project/project-details/project-details.component';
import {TaskFormComponent} from './task/task-form/task-form.component';
import {UserFormComponent} from './user/user-form/user-form.component';
import {AuthGuard} from '../shared/services/guards/auth.guard';
import {UserDetailsComponent} from './user/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      {
        path: 'projects',
        component: ProjectComponent,
        data: {roles: ['Admin', 'Manager']},
        canActivate: [RoleGuard]
      },
      {
        path: 'project/add',
        component: ProjectFormComponent,
        data: {roles: ['Admin', 'Manager']},
        canActivate: [RoleGuard]
      },
      {
        path: 'project/edit/:id',
        component: ProjectFormComponent,
        data: {roles: ['Manager']},
        canActivate: [RoleGuard]
      },
      {
        path: 'project/details/:id',
        component: ProjectDetailsComponent,
        data: {roles: ['Admin', 'Manager']},
        canActivate: [RoleGuard]
      },
      {
        path: 'tasks',
        component: TaskComponent,
        data: {roles: ['Manager']},
        canActivate: [RoleGuard]
      },
      {
        path: 'task/add',
        component: TaskFormComponent,
        data: {roles: ['Manager']},
        canActivate: [RoleGuard]
      },
      {
        path: 'task/edit/:id',
        component: TaskFormComponent,
        data: {roles: ['Manager']},
        canActivate: [RoleGuard]
      },
      {
        path: 'task/details/:id',
        component: ProjectDetailsComponent,
        data: {roles: ['Employee', 'Manager']},
        canActivate: [RoleGuard]
      },
      {
        path: 'users',
        component: UserComponent,
        data: {roles: ['Admin']},
        canActivate: [RoleGuard]
      },
      {
        path: 'user/add',
        component: UserFormComponent,
        data: {roles: ['Admin']},
        canActivate: [RoleGuard]
      },
      {
        path: 'user/edit/:id',
        component: UserFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user/details/:id',
        component: UserDetailsComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {
}
