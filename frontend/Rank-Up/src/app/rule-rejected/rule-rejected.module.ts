import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RuleRejectedPageRoutingModule } from './rule-rejected-routing.module';

import { RuleRejectedPage } from './rule-rejected.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RuleRejectedPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RuleRejectedPage]
})
export class RuleRejectedPageModule {}
