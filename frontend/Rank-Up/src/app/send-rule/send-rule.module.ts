import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendRulePageRoutingModule } from './send-rule-routing.module';

import { SendRulePage } from './send-rule.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendRulePageRoutingModule,
    ComponentsModule
  ],
  declarations: [SendRulePage]
})
export class SendRulePageModule {}
