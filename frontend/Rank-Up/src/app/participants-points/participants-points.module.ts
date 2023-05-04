import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticipantsPointsPageRoutingModule } from './participants-points-routing.module';

import { ParticipantsPointsPage } from './participants-points.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipantsPointsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ParticipantsPointsPage]
})
export class ParticipantsPointsPageModule {}
