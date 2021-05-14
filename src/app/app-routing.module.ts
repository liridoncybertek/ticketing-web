import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'guest',
    loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./member/member.module').then(m => m.MemberModule)
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
export class AppRoutingModule { }
