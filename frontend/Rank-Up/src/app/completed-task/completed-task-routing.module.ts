import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedTaskPage } from './completed-task.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedTaskPageRoutingModule {}
