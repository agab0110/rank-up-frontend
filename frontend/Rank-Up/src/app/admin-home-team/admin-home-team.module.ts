import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminHomeTeamPageRoutingModule } from './admin-home-team-routing.module';

import { AdminHomeTeamPage } from './admin-home-team.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminHomeTeamPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminHomeTeamPage]
})
export class AdminHomeTeamPageModule {}
