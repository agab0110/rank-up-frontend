import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskService } from '../services/task/task.service';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { Task } from '../models/task/task';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';
import { Notification } from '../models/notification/notification';
import { NotificationService } from '../services/notification/notification.service';
import { AdminService } from '../services/admin/admin.service';
import { AdminReciveNotificationService } from '../services/adminReciveNotification/admin-recive-notification.service';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-send-task',
  templateUrl: './send-task.page.html',
  styleUrls: ['./send-task.page.scss'],
})

export class SendTaskPage implements OnInit {

  public user: User;
  public data: any;
  public idTask: number = 1; //l'id deve essere ricevuto dalla pagina precedente
  public taskCompleted: TaskCompleted;
  public task: Task;
  team: Team;
  admins: Admin[];
  notification: Notification;
  file: any;

  public descrBtns = ["Chiudi"];
  public confirmBtns = [
    {
      text: 'Annulla',
      cssClass: 'alert-button-red'
    },
    {
      text: 'Conferma',
      cssClass: 'alert-button-blue',
      handler: () => {
        if(this.data) {
          this.taskCompleted.status = 0;
          this.taskCompleted.user = this.user;
          const task = new Task();
          task.id = this.idTask;
          this.taskCompleted.task = task;
        }

        if(this.file){
          this.fileService.uploadFile(this.file).subscribe((data: any) => {
            console.log(data);
            let attached = data.id;
            this.taskCompleted.attached = attached;
            this.taskCompletedService.insertTaskCompleted(this.taskCompleted).subscribe(data => {
              console.log(data)
            });
            this.location.back();
          }), (error: any) => {
            console.log(error);
          };
        } else {
          this.taskCompletedService.insertTaskCompleted(this.taskCompleted).subscribe(data => {
            console.log(data)
          });
          this.location.back();
      }
      }
    }
  ];
  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL: string | undefined | null;

  constructor(
    private location: Location,
    private taskService: TaskService,
    private taskCompletedService: TaskCompletedService,
    private router: Router,
    private notificationService: NotificationService,
    private adminService: AdminService,
    private adminReciveNotificationService: AdminReciveNotificationService,
    private fileService: FileService
  ) {
    this.taskCompleted = new TaskCompleted();
    this.user = new User();
    this.task = new Task();
    this.notification = new Notification();
    this.team = new Team();
    this.admins = [];
  }

  ngOnInit() {
    if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
      this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');

    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.task= JSON.parse(localStorage.getItem('viewTask') || '{}');

    this.idTask = this.task.id;

    this.taskService.getTask(this.idTask).subscribe(data => {
      this.data = data
      console.log(data)
    });


  }

  loadFileFromDevice(event: any) {
    event.target.files = null;
    this.file = event.target.files[0];
  }

  closeModal() {
    this.file = null;
    this.modal.dismiss();
  }

  attach() {
    this.modal.dismiss();
  }
  backButton() {
    this.location.back();
  }

  sendNotification() {
    this.notification.title = "Task completato";
    this.notification.description = "Il task " + this.task.name +  " e' stato completato da " + this.user.username;
    this.notificationService.newNotification(this.notification, this.team.codice).subscribe(n => {
      console.log(n);
      this.getAdmins(n);
    },(error: Response) => {
      if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  getAdmins(n: Notification) {
    this.adminService.getAdmins(this.team.codice).subscribe(result => {
      this.admins = result;
      console.log(this.admins);
      this.passNotification(n);
    },(error: Response) => {
      if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  addAdminNotification(n: Notification){
    this.admins.forEach(admin => {
      this.adminReciveNotificationService.addNotification(admin.id, n.id).subscribe(n => {
        console.log(n);
      },(error: Response) => {
        if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);});
    });
  }

  passNotification(n: Notification) {
    this.addAdminNotification(n);
  }

}
