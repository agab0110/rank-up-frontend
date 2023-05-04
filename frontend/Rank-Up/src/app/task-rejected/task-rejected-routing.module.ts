import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskRejectedPage } from './task-rejected.page';

const routes: Routes = [
  {
    path: '',
    component: TaskRejectedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRejectedPageRoutingModule {}
