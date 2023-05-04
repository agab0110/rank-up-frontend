import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RuleRejectedPage } from './rule-rejected.page';

const routes: Routes = [
  {
    path: '',
    component: RuleRejectedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RuleRejectedPageRoutingModule {}
