import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RuleConfirmationPageRoutingModule } from './rule-confirmation-routing.module';

import { RuleConfirmationPage } from './rule-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RuleConfirmationPageRoutingModule
  ],
  declarations: [RuleConfirmationPage]
})
export class RuleConfirmationPageModule {}
