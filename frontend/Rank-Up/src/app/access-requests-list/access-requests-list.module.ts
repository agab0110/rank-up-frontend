import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessRequestsListPageRoutingModule } from './access-requests-list-routing.module';

import { AccessRequestsListPage } from './access-requests-list.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessRequestsListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AccessRequestsListPage]
})
export class AccessRequestsListPageModule {}
