import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTeamSettingsPage } from './admin-team-settings.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTeamSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTeamSettingsPageRoutingModule {}
