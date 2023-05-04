import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipantsPointsPage } from './participants-points.page';

const routes: Routes = [
  {
    path: '',
    component: ParticipantsPointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantsPointsPageRoutingModule {}
