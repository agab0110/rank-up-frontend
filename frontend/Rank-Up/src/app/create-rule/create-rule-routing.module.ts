import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRulePage } from './create-rule.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRulePageRoutingModule {}
