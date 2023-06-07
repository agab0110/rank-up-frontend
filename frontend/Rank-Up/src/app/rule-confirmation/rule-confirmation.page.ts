import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { Team } from '../models/team/team';
import { NotificationService } from '../services/notification/notification.service';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { UserReciveNotificationService } from '../services/userReciveNotification/user-recive-notification.service';
import { Notification } from '../models/notification/notification';
import { FileService } from '../services/file/file.service';
import { DatePipe } from '@angular/common';  //Utilizzato per troncare il timestamp nell'html

@Component({
  selector: 'app-rule-confirmation',
  templateUrl: './rule-confirmation.page.html',
  styleUrls: ['./rule-confirmation.page.scss'],
})
export class RuleConfirmationPage implements OnInit {
  data: any
  stato = false
  public id!: number;
  private rule: any
  public user: User;
  ruleCompleted: RuleCompleted;
  comment!: string;
  bonusPoints!: number;
  status!: number;
  team: Team;
  notification: Notification;
  file: any;
  url: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private location: Location,
    private ruleCompletedService: RuleCompletedService,
    private notificationService: NotificationService,
    private userJoinsTeamService: UserJoinsTeamService,
    private userReciveNotificationService: UserReciveNotificationService,
    private fileService: FileService
  ) {
    this.user = new User();
    this.ruleCompleted = new RuleCompleted();
    this.team = new Team();
    this.notification = new Notification();
  }

  ngOnInit() {
    if (localStorage.getItem('team') == null || localStorage.getItem('team') == '')
      this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');

    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    localStorage.getItem('viewRule');
    this.rule = JSON.parse(localStorage.getItem('viewRule') || '{}')
    console.log(this.rule)
    this.id = this.rule.id_rule

    this.ruleCompletedService.getRuleDelivered(this.id).subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data))
      console.log(data);
      if(this.data. attached != null){
        this.fileService.getFile(this.data.attached).subscribe(file => {
          console.log(file);
          this.file = file;
          this.url = this.file.url ;
        });
      }else{
        this.url = null;
      }
    })
  }

  backButton() {
    this.location.back();
  }

  async nullAttachedAlert() {
    const alert = await this.alertController.create({
      header: 'Allegato non presente!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async presentAlertReject() {
    const alert = await this.alertController.create({
      header: 'Richesta Rifiutata',
      buttons: [
        {
          handler: () => {
            this.rejectActivity();
          },
          text: 'Chiudi',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Richesta Accettata',
      buttons: [
        {
          handler: () => {
            this.confirmActivity();
          },
          text: 'Chiudi',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }


  mostra() {
    this.stato = !this.stato;
  }

  rejectActivity() {
    this.ruleCompleted.comment = this.comment;
    this.ruleCompleted.bonus = this.bonusPoints;
    this.status = 2;

    this.ruleCompletedService.ruleAcceptation(this.id, this.status, this.ruleCompleted).subscribe(r => {
      console.log("patch succesfull");
      console.log(r);
      this.sendNotification(this.status);
    }, (error: Response) => {
      if (error.status == 400) {
        console.log("Error 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
    this.location.back();
  }

  confirmActivity() {
    this.ruleCompleted.comment = this.comment;
    this.status = 1;

    if (this.bonusPoints == null) {
      this.ruleCompleted.bonus = 0;
    } else {
      this.ruleCompleted.bonus = this.bonusPoints;
    }

    this.ruleCompletedService.ruleAcceptation(this.id, this.status, this.ruleCompleted).subscribe(r => {
      console.log("patch succesfull");
      console.log(r);
      this.sendNotification(this.status);
    }, (error: Response) => {
      if (error.status == 400) {
        console.log("Error 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
    this.location.back();
  }

  sendNotification(status: number) {
    if (status == 1) {
      this.notification.title = "Conferma regola";
      this.notification.description = "La regola " + this.rule.name +  " è stata confermata";
    } else {
      this.notification.title = "Regola rifiutata";
      this.notification.description = "La regola " + this.rule.name +  " è stata rifiutata";
    }

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
      this.userReciveNotificationService.addNotification(this.rule.id_user, n.id).subscribe(n => {
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
}
