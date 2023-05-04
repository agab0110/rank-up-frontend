import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessRequestsListPage } from './access-requests-list.page';

const routes: Routes = [
  {
    path: '',
    component: AccessRequestsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessRequestsListPageRoutingModule {}
