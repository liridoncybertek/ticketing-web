import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared/services/guards/auth.guard';

import {PageNotAllowedComponent} from './page-not-allowed/page-not-allowed.component';

const routes: Routes = [
  {
    path: 'guest',
    loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./member/member.module').then(m => m.MemberModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'page-not-allowed',
    component: PageNotAllowedComponent
  },
  {
    path: '',
    redirectTo: 'guest',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
