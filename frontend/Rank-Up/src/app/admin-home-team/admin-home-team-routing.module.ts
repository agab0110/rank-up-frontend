import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomeTeamPage } from './admin-home-team.page';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHomeTeamPageRoutingModule {}
