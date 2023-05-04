import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRuleCompletedPage } from './admin-rule-completed.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRuleCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRuleCompletedPageRoutingModule {}
