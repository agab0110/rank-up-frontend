import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTeamProfilePageRoutingModule } from './user-team-profile-routing.module';

import { UserTeamProfilePage } from './user-team-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTeamProfilePageRoutingModule
  ],
  declarations: [UserTeamProfilePage]
})
export class UserTeamProfilePageModule {}
