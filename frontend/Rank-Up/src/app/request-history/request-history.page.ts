import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { Team } from '../models/team/team';
import { Rule } from '../models/rule/rule';
import { Task } from '../models/task/task';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.page.html',
  styleUrls: ['./request-history.page.scss'],
})
export class RequestHistoryPage implements OnInit {
  ruleCompleted : RuleCompleted[];
  ruleRejected : RuleCompleted[];
  taskCompleted : TaskCompleted[];
  taskRejected : TaskCompleted[];
  team:Team;
  filter: number = 1;
  data: any;
  idTeam: any = 1;
  history: any[];

  constructor(
    private alertController: AlertController,
    private location: Location,
    private ruleCompletedService : RuleCompletedService,
    private taskCompletedService : TaskCompletedService
    ) {
    this.ruleCompleted = [];
    this.ruleRejected = [];
    this.taskCompleted = [];
    this.taskRejected = [];
    this.team = new Team();
    this.history = [];
   }

  ngOnInit(){
    if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    //if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
    //this.router.navigate(['user/home']);
    //this.admin = JSON.parse(localStorage.getItem('admin') || '{}');

    this.getRulesCompleted();
    this.getRulesRejected();
    this.getTaskAccepted();
    this.getTaskRejected();
    
    this.dataHistory();
  }

  dataHistory() {
    console.log(this.history);
    this.history.sort((a, b) => a.date - b.date);
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Ricerca per:',
      buttons: [
        {
          text: 'Nome Utente',
          cssClass: this.filter === 1 ? 'alert-button-red' : 'alert-button-blue',
          handler: () => {
            this.filter = 1;
          }
        },
        {
          text: 'Data di consegna',
          cssClass: this.filter === 2 ? 'alert-button-red' : 'alert-button-blue',
          handler: () => {
            this.filter = 2;
            this.dataHistory();
          }
        },
        {
          text: 'Nome attività',
          cssClass: this.filter === 3 ? 'alert-button-red' : 'alert-button-blue',
          handler: () => {
            this.filter = 3;
          }
        },
      ],
    });

    await alert.present();
  }


  backButton() {
    this.location.back();
  }

  getRulesCompleted(){
    this.ruleCompletedService.ruleAccepted(/*this.team.codice*/1).subscribe(Response =>{
      this.ruleCompleted = Response;
      console.log(this.ruleCompleted);
      this.ruleCompleted.forEach(element => {
        this.history.push(element);
      });
    },(error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
      });
  }

  getRulesRejected(){
    this.ruleCompletedService.rulerejected(/*this.team.codice*/1).subscribe(Response =>{
      this.ruleRejected = Response;
      console.log(this.ruleRejected);
      this.ruleRejected.forEach(element => {
        this.history.push(element);
      });
    },(error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
      });
  }

  getTaskAccepted(){
    this.taskCompletedService.taskAccepted(/*this.team.codice*/1).subscribe(Response =>{
      this.taskCompleted = Response;
      console.log(this.taskCompleted);
      this.taskCompleted.forEach(element => {
        this.history.push(element);
      });
    },(error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
      });
  }

  getTaskRejected(){
    this.taskCompletedService.taskRejected(/*this.team.codice*/1).subscribe(Response =>{
      this.taskRejected = Response;
      console.log(this.taskRejected);
      this.taskRejected.forEach(element => {
        this.history.push(element);
      });
    },(error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
      });
  }

  ricerca(event: any) {
    if(event.target.value != "") {
      this.ruleCompletedService.getUserHistory(this.idTeam, event.target.value.toLowerCase()).subscribe(data => {
        this.data = JSON.parse(JSON.stringify(data))

        console.log(data)
      });
    }
  }
}
