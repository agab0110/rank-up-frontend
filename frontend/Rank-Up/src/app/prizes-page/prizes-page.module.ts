import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrizesPagePageRoutingModule } from './prizes-page-routing.module';

import { PrizesPagePage } from './prizes-page.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrizesPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [PrizesPagePage]
})
export class PrizesPagePageModule {}
