import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPrizesPagePage } from './admin-prizes-page.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPrizesPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPrizesPagePageRoutingModule {}
