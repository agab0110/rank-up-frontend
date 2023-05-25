import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NotificationService } from '../services/notification/notification.service';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { Notification } from '../models/notification/notification';
import { UserReciveNotification } from '../models/userReciveNotification/user-recive-notification';
import { UserReciveNotificationService } from '../services/userReciveNotification/user-recive-notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  user : User;
  stato : Boolean;
  public alertBtns = ["Accetta", "Rifiuta"];
  type='utente';
  notifications:UserReciveNotification[];
  team: Team;

  constructor(private location: Location, private userNotificationService:UserReciveNotificationService) {
    this.notifications = new Array<UserReciveNotification>;
    this.team = new Team();
    this.user = new User();
    this.stato = false;
  }

  ngOnInit() {
    //if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    //this.team = JSON.parse(localStorage.getItem('team') || '{}');
    //if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
    //this.router.navigate(['user/home']);
    //this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.getUserNotification(1);
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
    this.userNotificationService.getNotification(2).subscribe(response => {
      this.notifications= response;
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
  getNotification(){
    this.userNotificationService.getNotification(1).subscribe(response =>{
     this.notifications = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }
}
