import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendTaskPageRoutingModule } from './send-task-routing.module';

import { SendTaskPage } from './send-task.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendTaskPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SendTaskPage]
})
export class SendTaskPageModule {}
