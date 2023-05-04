import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserNotificationDescriptionPage } from './user-notification-description.page';

const routes: Routes = [
  {
    path: '',
    component: UserNotificationDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserNotificationDescriptionPageRoutingModule {}
