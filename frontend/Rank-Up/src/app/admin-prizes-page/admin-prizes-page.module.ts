import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPrizesPagePageRoutingModule } from './admin-prizes-page-routing.module';

import { AdminPrizesPagePage } from './admin-prizes-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPrizesPagePageRoutingModule
  ],
  declarations: [AdminPrizesPagePage]
})
export class AdminPrizesPagePageModule {}
