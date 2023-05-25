import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { NotificationService } from '../services/notification/notification.service';
import { Notification } from '../models/notification/notification';
import { User } from '../models/user/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  userNotification : Notification[];
  user : User;
  stato : Boolean;

  public alertBtns = ["Accetta", "Rifiuta"];
  type='admin';

  constructor(
    private location: Location,
    private notificationService: NotificationService,
    private route: ActivatedRoute
    ) {
      this.userNotification = new Array<Notification>;
      this.user = new User;
      this.stato = true;
    }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  segmentChanged(ev: any, idUser: Number){
    this.stato = !this.stato;
    if(!this.stato){
      this.getUserNotification(idUser);
    }else{
      this.getAdminNotification()
    }
  }

  backButton() {
    this.location.back();
  }

  public getUserNotification(idUser: Number) {
    this.notificationService.getUserNotifications(idUser).subscribe(response => {
      this.userNotification = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  public getAdminNotification(){}
}
