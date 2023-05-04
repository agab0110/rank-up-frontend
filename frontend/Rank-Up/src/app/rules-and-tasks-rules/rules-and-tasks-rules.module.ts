import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RulesAndTasksRulesPageRoutingModule } from './rules-and-tasks-rules-routing.module';

import { RulesAndTasksRulesPage } from './rules-and-tasks-rules.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RulesAndTasksRulesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RulesAndTasksRulesPage]
})
export class RulesAndTasksRulesPageModule {}
