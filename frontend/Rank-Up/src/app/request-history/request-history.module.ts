import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestHistoryPageRoutingModule } from './request-history-routing.module';

import { RequestHistoryPage } from './request-history.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestHistoryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RequestHistoryPage]
})
export class RequestHistoryPageModule {}
