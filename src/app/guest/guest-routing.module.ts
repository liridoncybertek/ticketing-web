import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {GuestComponent} from './guest.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent
      },
      {
        path: '',
        redirectTo: 'login',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
