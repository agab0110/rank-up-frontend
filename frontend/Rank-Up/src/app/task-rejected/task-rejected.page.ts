import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';
import { FileService } from '../services/file/file.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-task-rejected',
  templateUrl: './task-rejected.page.html',
  styleUrls: ['./task-rejected.page.scss'],
})
export class TaskRejectedPage implements OnInit {

  taskCompleted: TaskCompleted;
  task: TaskCompleted;
  user: User;
  file: any;
  url: any;

  constructor(
    private location: Location,
    private taskCompletedService: TaskCompletedService,
    private fileService: FileService,
    private alertController: AlertController
    ) {
    this.taskCompleted = new TaskCompleted();
    this.task = new TaskCompleted();
    this.user = new User();
   }

  ngOnInit() {
    this.task= JSON.parse(localStorage.getItem('viewTask') || '{}');

    if(this.task.attached != null){
      this.fileService.getFile(this.task.attached).subscribe(file => {
        console.log(file);
        this.file = file;
        this.url = this.file.url;
      });
    }
    else {
      this.url = null;
    }
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
}
