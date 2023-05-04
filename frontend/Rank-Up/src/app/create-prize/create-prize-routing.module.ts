import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePrizePage } from './create-prize.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePrizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePrizePageRoutingModule {}
