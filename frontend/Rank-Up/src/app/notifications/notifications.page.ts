import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NotificationService } from '../services/notification/notification.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  idUser: any = 2;
  nUser: any
  nAdmin: any

  public alertBtns = ["Accetta", "Rifiuta"];
  type='utente';

  constructor(
    private location: Location,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService.getUserNotification(this.idUser).subscribe(data => {
      this.nUser = data;
      console.log(this.nUser)
    })

    this.notificationService.getAdminNotification(this.idUser).subscribe(data => {
      this.nAdmin = data;
      console.log(this.nAdmin)
    })
  }

  notificheUser(event: any){
    this.notificationService.getUserNotification(this.idUser).subscribe(data => {
      this.nUser = data;
      console.log(this.nUser)
    })
  }

  notificheAdmin(event: any){
    this.notificationService.getAdminNotification(this.idUser).subscribe(data => {
      this.nAdmin = data;
      console.log(this.nAdmin)
    })
  }
  
  backButton() {
    this.location.back();
  }
}
