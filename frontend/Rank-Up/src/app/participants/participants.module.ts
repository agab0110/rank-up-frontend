import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticipantsPageRoutingModule } from './participants-routing.module';

import { ParticipantsPage } from './participants.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipantsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ParticipantsPage]
})
export class ParticipantsPageModule {}
