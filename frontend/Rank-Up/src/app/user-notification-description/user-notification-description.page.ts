import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';
import { Notification } from '../models/notification/notification';

@Component({
  selector: 'app-user-notification-description',
  templateUrl: './user-notification-description.page.html',
  styleUrls: ['./user-notification-description.page.scss'],
})
export class UserNotificationDescriptionPage implements OnInit {
  idNotification: Number;
  notification: Notification;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private notificationService: NotificationService
    ) {
      this.idNotification = 0;
      this.notification = new Notification();
     }

  ngOnInit() {
    this.notification = JSON.parse(localStorage.getItem('viewNotificationUser') || '{}');
  }
  backButton() {
    this.location.back();
  }

  getNotification(idNotification: Number){
    this.notificationService.getUserNotification(idNotification).subscribe(response => {
      this.notification = response;
    },(error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
      });
  }
}
