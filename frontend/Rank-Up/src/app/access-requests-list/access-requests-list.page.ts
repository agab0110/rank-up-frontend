import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';
import { UserReciveNotificationService } from '../services/userReciveNotification/user-recive-notification.service';
import { Notification } from '../models/notification/notification';

@Component({
  selector: 'app-access-requests-list',
  templateUrl: './access-requests-list.page.html',
  styleUrls: ['./access-requests-list.page.scss'],
})
export class AccessRequestsListPage implements OnInit {
  userJoinsTeam: UserJoinsTeam;
  requests : Notification[];
  team: Team;
  admin: Admin;
  user: User;
  userJoin: UserJoinsTeam[];
  notification: Notification;

  constructor(
    private location: Location,
    private alertController: AlertController,
    private userJoinsTeamService: UserJoinsTeamService,
    private router: Router,
    private notificationService: NotificationService,
    private userReciveNotificationService: UserReciveNotificationService
    ) {
      this.userJoinsTeam = new UserJoinsTeam();
      this.requests = new Array<Notification>;
      this.userJoin = new Array<UserJoinsTeam>;
      this.team = new Team();
      this.admin = new Admin();
      this.user = new User();
      this.notification = new Notification();
    }

  ngOnInit() {
       this.team = JSON.parse(localStorage.getItem('team') || '{}');
       if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
         this.router.navigate(['user/home']);

       if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
          this.router.navigate(['user/home']);

       this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
       this.user = JSON.parse(localStorage.getItem('user') || '{}');

       this.getRequest();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.userJoin = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  backButton() {
    this.location.back();
  }

  async presentAlert(u: UserJoinsTeam) {
    const alert = await this.alertController.create({
      header: "Accettare l'utente " + u.user.name + " nel Team " + u.team.name + "?",
      buttons: [
        {
          text: 'Accetta',
          cssClass: 'alert-button-blue',
          handler: () => {
            this.addUserAlert();
            this.manageRequest(u.user.id);
          }
        },
        {
          text: 'Rifiuta',
          cssClass: 'alert-button-red',
          handler: () => {
            this.deleteRequest(u.id);
          }
        },
      ],
    });

    await alert.present();
  }

  deleteRequest(id: number){
    this.userJoinsTeamService.deleteRequest(id).subscribe(() => {
      console.log('Delete successful');
      this.sendRejectNotification();
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  public getRequest(){
    this.userJoinsTeamService.getRequests(this.team.codice).subscribe(response =>{
      this.userJoin = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  public manageRequest(id: number) {
    this.userJoinsTeamService.manageRequest(this.team.codice, id, "1").subscribe(() => {
      console.log("patch successful");
      this.sendAcceptNotification();
    }, (error: Response) => {
      if (error.status == 400) {
        console.log("Error 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    }
    );
  }

  sendRejectNotification() {
    this.notification.title = "Richiesta rifiutata";
    this.notification.description = "La tua richiesta per il team " + this.team.name +  " è stata rifiutata";
    
    this.notificationService.newNotification(this.notification, this.team.codice).subscribe(n => {
      console.log(n);
      this.addUserNotification(n);
    },(error: Response) => {
      if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  sendAcceptNotification() {
    this.notification.title = "Richiesta accettata";
    this.notification.description = "La tua richiesta per il team " + this.team.name +  " è stata accettata";
    
    this.notificationService.newNotification(this.notification, this.team.codice).subscribe(n => {
      console.log(n);
      this.addUserNotification(n);
    },(error: Response) => {
      if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  addUserNotification(n: Notification){
      this.userReciveNotificationService.addNotification(this.user.id, n.id).subscribe(n => {
        console.log(n);
      },(error: Response) => {
        if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  async addUserAlert() {
    const alert = await this.alertController.create({
      header: 'Utente aggiunto con successo!',
      message: '',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }
}
