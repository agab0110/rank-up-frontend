import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from 'src/app/components/input/input.component';
import { BtUserSmallComponent } from 'src/app/components/bt-user-small/bt-user-small.component';
import { BtUserLargeComponent } from 'src/app/components/bt-user-large/bt-user-large.component';
import { BtAdminLargeComponent } from 'src/app/components/bt-admin-large/bt-admin-large.component';
import { BtAdminSmallComponent } from 'src/app/components/bt-admin-small/bt-admin-small.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { UserInsertBarComponent } from 'src/app/components/user-insert-bar/user-insert-bar.component';
import { AdminInsertBarComponent } from 'src/app/components/admin-insert-bar/admin-insert-bar.component';
import { AdminInsertBarNoselectComponent } from 'src/app/components/admin-insert-bar-noselect/admin-insert-bar-noselect.component';
import { UserInsertBarNoselectComponent } from 'src/app/components/user-insert-bar-noselect/user-insert-bar-noselect.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { UserChoseBarComponent } from 'src/app/components/user-chose-bar/user-chose-bar.component';
import { AdminChoseBarComponent } from 'src/app/components/admin-chose-bar/admin-chose-bar.component';
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { SquareListComponent } from 'src/app/components/square-list/square-list.component';
import { UserElementBarComponent } from 'src/app/components/user-element-bar/user-element-bar.component';
import { AdminElementBarComponent } from 'src/app/components/admin-element-bar/admin-element-bar.component';
import { ConfirmButtonsComponent } from 'src/app/components/confirm-buttons/confirm-buttons.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InputComponent, 
    BtUserSmallComponent, 
    BtUserLargeComponent, 
    BtAdminLargeComponent, 
    BtAdminSmallComponent, 
    SearchBarComponent, 
    UserInsertBarComponent, 
    AdminInsertBarComponent, 
    AdminInsertBarNoselectComponent, 
    UserInsertBarNoselectComponent, 
    NavbarComponent,
    UserChoseBarComponent,
    AdminChoseBarComponent,
    ListItemComponent,
    SquareListComponent,
    UserElementBarComponent,
    AdminElementBarComponent,
    ConfirmButtonsComponent
  ],

  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],

  exports: [
    InputComponent, 
    BtUserSmallComponent, 
    BtUserLargeComponent, 
    BtAdminLargeComponent, 
    BtAdminSmallComponent, 
    SearchBarComponent,
    UserInsertBarComponent, 
    AdminInsertBarComponent, 
    AdminInsertBarNoselectComponent, 
    UserInsertBarNoselectComponent, 
    NavbarComponent,
    UserChoseBarComponent,
    AdminChoseBarComponent,
    ListItemComponent,
    SquareListComponent,
    UserElementBarComponent,
    AdminElementBarComponent,
    ConfirmButtonsComponent
  ],

  entryComponents: [
    InputComponent, 
    BtUserSmallComponent, 
    BtUserLargeComponent, 
    BtAdminLargeComponent, 
    BtAdminSmallComponent, 
    SearchBarComponent, 
    UserInsertBarComponent, 
    AdminInsertBarComponent, 
    AdminInsertBarNoselectComponent, 
    UserInsertBarNoselectComponent, 
    NavbarComponent,
    UserChoseBarComponent,
    AdminChoseBarComponent,
    ListItemComponent,
    SquareListComponent,
    UserElementBarComponent,
    AdminElementBarComponent,
    ConfirmButtonsComponent
  ]
})
export class ComponentsModule { }
