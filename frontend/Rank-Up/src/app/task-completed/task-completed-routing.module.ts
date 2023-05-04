import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskCompletedPage } from './task-completed.page';

const routes: Routes = [
  {
    path: '',
    component: TaskCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskCompletedPageRoutingModule {}
