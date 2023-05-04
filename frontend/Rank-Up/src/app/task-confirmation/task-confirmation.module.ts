import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskConfirmationPageRoutingModule } from './task-confirmation-routing.module';

import { TaskConfirmationPage } from './task-confirmation.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskConfirmationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TaskConfirmationPage]
})
export class TaskConfirmationPageModule {}
