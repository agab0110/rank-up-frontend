import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RuleConfirmationPage } from './rule-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: RuleConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RuleConfirmationPageRoutingModule {}
