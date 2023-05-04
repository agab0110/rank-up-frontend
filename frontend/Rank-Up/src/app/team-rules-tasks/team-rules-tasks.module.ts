import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamRulesTasksPageRoutingModule } from './team-rules-tasks-routing.module';

import { TeamRulesTasksPage } from './team-rules-tasks.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamRulesTasksPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TeamRulesTasksPage]
})
export class TeamRulesTasksPageModule {}
