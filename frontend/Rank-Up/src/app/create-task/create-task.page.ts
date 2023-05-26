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
    //this.rule.admin = this.admin;   //setta l'admin presente nel local storage, api 1
    //this.rule.team = this.team;     //setta il team presente nel local storage, api 1
    this.taskService.newTask(this.task).subscribe(response => {
    console.log("task creato con sucesso");
    console.log(response);
  }, (error: Response) => {
    if (error.status == 400)
      console.log("400 error");
    else {
      console.log('An unexpected error occured');
    }
    console.log(error);
  });
}
}
