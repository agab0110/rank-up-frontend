import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamPageRoutingModule } from './team-routing.module';

import { TeamPage } from './team.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TeamPage]
})
export class TeamPageModule {}
