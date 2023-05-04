import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendTaskPage } from './send-task.page';

const routes: Routes = [
  {
    path: '',
    component: SendTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendTaskPageRoutingModule {}
