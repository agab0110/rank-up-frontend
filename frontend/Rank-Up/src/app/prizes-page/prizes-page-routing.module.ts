import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrizesPagePage } from './prizes-page.page';

const routes: Routes = [
  {
    path: '',
    component: PrizesPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrizesPagePageRoutingModule {}
