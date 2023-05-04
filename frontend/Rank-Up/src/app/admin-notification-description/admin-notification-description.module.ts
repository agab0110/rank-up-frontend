import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminNotificationDescriptionPageRoutingModule } from './admin-notification-description-routing.module';

import { AdminNotificationDescriptionPage } from './admin-notification-description.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminNotificationDescriptionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminNotificationDescriptionPage]
})
export class AdminNotificationDescriptionPageModule {}
