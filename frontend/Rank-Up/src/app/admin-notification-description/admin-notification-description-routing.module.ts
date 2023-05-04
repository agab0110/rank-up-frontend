import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminNotificationDescriptionPage } from './admin-notification-description.page';

const routes: Routes = [
  {
    path: '',
    component: AdminNotificationDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminNotificationDescriptionPageRoutingModule {}
