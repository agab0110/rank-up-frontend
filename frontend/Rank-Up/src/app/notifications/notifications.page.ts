import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NotificationService } from '../services/notification/notification.service';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { Notification } from '../models/notification/notification';
import { UserReciveNotification } from '../models/userReciveNotification/user-recive-notification';
import { UserReciveNotificationService } from '../services/userReciveNotification/user-recive-notification.service';
import { AdminReciveNotification } from '../models/adminReciveNotification/admin-recive-notification';
import { AdminReciveNotificationService } from '../services/adminReciveNotification/admin-recive-notification.service';
import { Admin } from '../models/admin/admin';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';     // Viene usato nell'html per troncare la data

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  user: User;
  admin: Admin;
  stato: Boolean;

  idUser: any = 2;
  nUser: any
  nAdmin: any

  public alertBtns = ["Accetta", "Rifiuta"];
  type = 'utente';
  notifications: UserReciveNotification[];
  adminNotifications: AdminReciveNotification[];
  team: Team;

  constructor(
    private location: Location,
    private userNotificationService: UserReciveNotificationService,
    private adminNotificationService: AdminReciveNotificationService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.notifications = new Array<UserReciveNotification>;
    this.adminNotifications = new Array<AdminReciveNotification>;
    this.team = new Team();
    this.user = new User();
    this.admin = new Admin();
    this.stato = false;
  }

  ngOnInit() {
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getUserNotification(this.user.id);

    this.notificationService.getUserNotifications(this.user.id).subscribe(data => {
      this.nUser = data;
      console.log(this.nUser)
    })

    this.notificationService.getAdminNotifications(this.user.id).subscribe(data => {
      this.nAdmin = data;
      console.log(this.nAdmin)
    })
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.nAdmin = [];
      this.nUser = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  segmentChanged(ev: any, idUser: Number, idAdmin: Number) {
    this.stato = !this.stato;
    if (!this.stato) {
      this.getUserNotification(idUser);
    } else {
      this.getAdminNotification(idAdmin)
    }
  }

  notificheUser(event: any) {
    this.notificationService.getUserNotifications(this.user.id).subscribe(data => {
      this.nUser = data;
      console.log(this.nUser)
    })
  }

  notificheAdmin(event: any) {
    this.notificationService.getAdminNotifications(this.user.id).subscribe(data => {
      this.nAdmin = data;
      console.log(this.nAdmin)
    })
  }

  backButton() {
    this.router.navigate(['user/home']);
  }

  public getUserNotification(idUser: Number) {
    this.userNotificationService.getNotification(this.user.id).subscribe(response => {
      this.notifications = response;
    }, (error: Response) => {
      if (error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  public getAdminNotification(idAmin: Number) {
    this.adminNotificationService.getAdminNotification(this.admin.id).subscribe(response => {
      this.adminNotifications = response;
    }, (error: Response) => {
      if (error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }
  clicknotificationUser(notifications: Notification) {
    let notificationUser = JSON.stringify(notifications);
    localStorage.setItem("viewNotificationUser", notificationUser);
  }
  clicknotificationAdmin(notifications: Notification) {
    let notificationAdmin = JSON.stringify(notifications);
    localStorage.setItem("viewNotificationAdmin", notificationAdmin);
  }
}
