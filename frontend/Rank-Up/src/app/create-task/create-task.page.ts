import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';
import { Task } from '../models/task/task';
import { TaskService } from '../services/task/task.service';
import { Router } from '@angular/router';
import { User } from '../models/user/user';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {
  task: Task;
  team: Team;
  admin: Admin;
  user:User;

  constructor(private alertController: AlertController, private location: Location, private taskService:TaskService,private router: Router) {
    this.task = new Task();
    this.team = new Team();
    this.admin = new Admin();
    this.user = new User();
   }

  //async presentAlert() {
  //  const alert = await this.alertController.create({
  //    header: 'Inserire Nome Utente:',
  //    inputs: [
  //      {
  //        placeholder: 'Nome Utente',
  //        cssClass: 'alert-input',
  //      },
  //    ],
  //    buttons: [
  //      {
  //        text: 'Aggiungi',
  //        cssClass: 'alert-button-blue',
  //      },
  //      {
  //        text: 'Annulla',
  //        cssClass: 'alert-button-red',
  //      },
  //    ],
  //  });
  //await alert.present();
  //}
  // -----Implementazione Futura---------

  ngOnInit() {
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
  }

  backButton() {
    this.location.back();
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Task creato con successo!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async emptyNameAlert() {
    const alert = await this.alertController.create({
      header: 'Nome del task vuoto, task non creato',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async emptyPointsAlert() {
    const alert = await this.alertController.create({
      header: 'Punti del task mancanti, task non creato',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }


  async rejectedAlert() {
    const alert = await this.alertController.create({
      header: 'Errore nella creazione del task!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async emptyDateAlert() {
    const alert = await this.alertController.create({
      header: 'Scadenza del task non inserita, task non creato',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  public createTask(){
    if(!this.task.name){
      this.emptyNameAlert();
    }
    if(!this.task.points){
      this.emptyPointsAlert();
    }
    this.task.admin = this.admin; 
    this.task.team = this.team;  
    this.taskService.newTask(this.task,this.task.name).subscribe(response => {
    console.log("task creato con sucesso");
    console.log(response);
    this.confirmationAlert();
  }, (error: Response) => {
    console.log(error);
    if (error.status == 400){
      console.log("400 error");
      this.rejectedAlert();
    }
    else {
      console.log('An unexpected error occured');
      this.rejectedAlert();
    }
  });
}
}
