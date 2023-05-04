import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRuleCompletedPageRoutingModule } from './admin-rule-completed-routing.module';

import { AdminRuleCompletedPage } from './admin-rule-completed.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRuleCompletedPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminRuleCompletedPage]
})
export class AdminRuleCompletedPageModule {}
