import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTeamProfilePage } from './user-team-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UserTeamProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTeamProfilePageRoutingModule {}
