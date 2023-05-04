import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamRulesTasksPage } from './team-rules-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: TeamRulesTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRulesTasksPageRoutingModule {}
