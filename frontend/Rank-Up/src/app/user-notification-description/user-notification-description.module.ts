import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserNotificationDescriptionPageRoutingModule } from './user-notification-description-routing.module';

import { UserNotificationDescriptionPage } from './user-notification-description.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserNotificationDescriptionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UserNotificationDescriptionPage]
})
export class UserNotificationDescriptionPageModule {}
