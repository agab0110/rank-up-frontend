import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskRejectedPageRoutingModule } from './task-rejected-routing.module';

import { TaskRejectedPage } from './task-rejected.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskRejectedPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TaskRejectedPage]
})
export class TaskRejectedPageModule {}
