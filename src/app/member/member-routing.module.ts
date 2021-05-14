import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemberComponent} from './member.component';
import {ProjectComponent} from './project/project.component';
import {TaskComponent} from './task/task.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      {
        path: 'projects',
        component: ProjectComponent
      },
      {
        path: 'tasks',
        component: TaskComponent
      },
      {
        path: 'users',
        component: UserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {
}
