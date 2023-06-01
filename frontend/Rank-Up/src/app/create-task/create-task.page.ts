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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Inserire Nome Utente:',
      inputs: [
        {
          placeholder: 'Nome Utente',
          cssClass: 'alert-input',
        },
      ],
      buttons: [
        {
          text: 'Aggiungi',
          cssClass: 'alert-button-blue',
        },
        {
          text: 'Annulla',
          cssClass: 'alert-button-red',
        },
      ],
    });

  await alert.present();
  }

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
  public createTask(){
    this.task.admin = this.admin;   //setta l'admin presente nel local storage, api 1
    this.task.team = this.team;     //setta il team presente nel local storage, api 1
    this.taskService.newTask(this.task,this.task.name).subscribe(response => {
    console.log("task creato con sucesso");
    console.log(response);
  }, async (error: Response) => {
    console.log(error);
    const alert = await this.alertController.create({
      header: "Nome già in uso",
      message: "Inserire un altro nome",
      cssClass: 'alert-button-red',
      buttons: ['Chiudi']
    });
    await alert.present();
  });
}
}
