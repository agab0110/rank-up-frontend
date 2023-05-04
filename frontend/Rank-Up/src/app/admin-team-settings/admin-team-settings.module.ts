import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTeamSettingsPageRoutingModule } from './admin-team-settings-routing.module';

import { AdminTeamSettingsPage } from './admin-team-settings.page';
import { ComponentsModule } from '../modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTeamSettingsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminTeamSettingsPage]
})
export class AdminTeamSettingsPageModule {}
