import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NotificationService } from '../services/notification/notification.service';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public alertBtns = ["Accetta", "Rifiuta"];
  type='utente';
  notifications:Notification[];
  user: User;
  team: Team;
  notification!:Notification;
  constructor(private location: Location, private notificationService:NotificationService) { 
    this.notifications = new Array<Notification>;
    this.team = new Team();
    this.user = new User();

  }

  ngOnInit() {
    //if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    //this.team = JSON.parse(localStorage.getItem('team') || '{}');
    //if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
    //this.router.navigate(['user/home']);
    //this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.getNotification();
  }

  segmentChanged(ev: any){
    console.log('Type changed ', ev)
  }
  
  backButton() {
    this.location.back();
  }
  getNotification(){
    this.notificationService.getNotification(1).subscribe(response =>{
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
