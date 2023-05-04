import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendRulePage } from './send-rule.page';

const routes: Routes = [
  {
    path: '',
    component: SendRulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendRulePageRoutingModule {}
