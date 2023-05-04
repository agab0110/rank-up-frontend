import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRuleCompletedPage } from './user-rule-completed.page';

const routes: Routes = [
  {
    path: '',
    component: UserRuleCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRuleCompletedPageRoutingModule {}
