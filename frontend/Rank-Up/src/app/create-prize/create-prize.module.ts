import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePrizePageRoutingModule } from './create-prize-routing.module';

import { CreatePrizePage } from './create-prize.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePrizePageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreatePrizePage]
})
export class CreatePrizePageModule {}
