import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { Task } from '../models/task/task';

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

  constructor(
    private alertController: AlertController,
    private router: Router,
    private location: Location,
    private taskCompletedService: TaskCompletedService
  ) {
    this.user = new User();
    this.taskCompleted = new TaskCompleted();
  }

  ngOnInit() {
    localStorage.setItem('teamId', '');
    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    localStorage.getItem('viewTask');
    this.task = JSON.parse(localStorage.getItem('viewTask') || '{}')
    console.log(this.task)
    this.id = this.task.id_task

    this.taskCompletedService.getTaskDelivered(this.id).subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data))
      console.log(data)
    })
  }

  backButton() {
    this.location.back();
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
    this.taskCompleted.bonus = this.bonusPoints

    this.taskCompletedService.confirmationTaskCompleted(this.id, status, this.taskCompleted).subscribe(data => {
      console.log(data)
    })
  }
}
