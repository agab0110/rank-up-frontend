import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { Task } from '../models/task/task';
import { Notification } from '../models/notification/notification';
import { NotificationService } from '../services/notification/notification.service';
import { Team } from '../models/team/team';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { UserReciveNotificationService } from '../services/userReciveNotification/user-recive-notification.service';
import { FileService } from '../services/file/file.service';
import { DatePipe } from '@angular/common';     // Viene usato nell'html per troncare la data

@Component({
  selector: 'app-task-confirmation',
  templateUrl: './task-confirmation.page.html',
  styleUrls: ['./task-confirmation.page.scss'],
})
export class TaskConfirmationPage implements OnInit {

  public data: any
  public stato = false
  public user: User;
  public comment!: string;
  public bonusPoints!: number;
  public id!: number;
  private task: any
  private taskCompleted: TaskCompleted;
  notification: Notification;
  team: Team;
  file: any;
  url: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private location: Location,
    private taskCompletedService: TaskCompletedService,
    private notificationService: NotificationService,
    private userJoinsTeamService: UserJoinsTeamService,
    private userReciveNotificationService: UserReciveNotificationService,
    private fileService: FileService
  ) {
    this.user = new User();
    this.taskCompleted = new TaskCompleted();
    this.notification = new Notification();
    this.team = new Team();
  }

  ngOnInit() {
    if (localStorage.getItem('team') == null || localStorage.getItem('team') == '')
      this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');

    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    localStorage.getItem('viewTask');
    this.task = JSON.parse(localStorage.getItem('viewTask') || '{}')
    console.log(this.task)
    this.id = this.task.id_task_completed

    this.taskCompletedService.getTaskDelivered(this.id).subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data))
      console.log(data)
      if(this.data.attached != null){
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
            this.sendTask(2);
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
            this.sendTask(1);
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

  sendTask(status: number) {
    this.taskCompleted.id = this.id
    this.taskCompleted.comment = this.comment

    if (this.bonusPoints == null) {
      this.taskCompleted.bonus = 0;
    } else {
      this.taskCompleted.bonus = this.bonusPoints;
    }
    
    this.taskCompleted.task = new Task();
    this.taskCompleted.task.id = this.task.id_task
    this.taskCompleted.user = new User();
    this.taskCompleted.user.id = this.task.id_user
    
    this.taskCompleted.task.team = new Team();
    this.taskCompleted.task.team.codice = this.team.codice;
    
    this.taskCompletedService.confirmationTaskCompleted(this.id, status, this.taskCompleted).subscribe(data => {
      console.log(data);
      this.sendNotification(status);
      this.location.back();
    })

    this.backButton();
  }

  sendNotification(status: number) {
    if (status == 1) {
      this.notification.title = "Conferma task";
      this.notification.description = "Il task " + this.task.name +  " è stato confermato";
    } else {
      this.notification.title = "Rifiuto task";
      this.notification.description = "Il task " + this.task.name +  " è stato rifiutato";
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
      this.userReciveNotificationService.addNotification(this.task.id_user, n.id).subscribe(n => {
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
