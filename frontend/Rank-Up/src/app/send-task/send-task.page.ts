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

@Component({
  selector: 'app-send-task',
  templateUrl: './send-task.page.html',
  styleUrls: ['./send-task.page.scss'],
})

export class SendTaskPage implements OnInit {

  public user: User;
  public data: any;
  public idTask: any = 1; //l'id deve essere ricevuto dalla pagina precedente
  public taskCompleted: TaskCompleted;
  public task: Task;
  team: Team;
  admins: Admin[];
  notification: Notification;

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
          if(this.blobURL) {
            this.taskCompleted.attached = this.blobURL;
          }
          this.taskCompleted.status = 0;
          this.taskCompleted.user = this.user;
          const task = new Task();
          task.id = this.idTask;
          this.taskCompleted.task = task;
        }
    
        this.taskCompletedService.insertTaskCompleted(this.taskCompleted).subscribe((data: any) => {
          console.log(data)
        });
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
    private adminReciveNotificationService: AdminReciveNotificationService
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
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      this.blobURL = URL.createObjectURL(this.blob);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  closeModal() {
    this.blob = null;
    this.blobURL = null;
    this.modal.dismiss();
  }

  attach() {
    this.modal.dismiss();
  }
  backButton() {
    this.location.back();
  }

  sendNotification() {
    this.notification.title = "Regola completata";
    this.notification.description = "La regola " + this.taskCompleted.task.name +  " e' stata completata da " + this.user.username;
    this.notificationService.newNotification(this.notification, this.team.codice).subscribe(n => {
      console.log(n);

      this.addAdminNotification(n);
    },(error: Response) => {
      if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  getAdmins() {
    this.adminService.getAdmins(this.team.codice).subscribe(result => {
      this.admins = result;
      console.log(this.admins);
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

}
