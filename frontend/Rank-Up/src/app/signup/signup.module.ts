import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { ComponentsModule } from '../modules/components/components.module';
import { UserService } from '../services/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    ComponentsModule
  ],
  providers: [UserService],
  declarations: [SignupPage]
})
export class SignupPageModule {}
