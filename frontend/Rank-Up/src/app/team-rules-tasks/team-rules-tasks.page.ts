import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Rule } from '../models/rule/rule';
import { RuleService } from '../services/rule/rule.service';
import { TaskService } from '../services/task/task.service';
import { Task } from '../models/task/task';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-team-rules-tasks',
  templateUrl: './team-rules-tasks.page.html',
  styleUrls: ['./team-rules-tasks.page.scss'],
})
export class TeamRulesTasksPage implements OnInit {

  public alertBtns = ["Accetta", "Rifiuta"];
  type='rules';
  stato= false;
  rules : Rule[];
  tasks : Task[];
  team : Team;
  task : Task;
  rule : Rule;
  admin: Admin;
  user:User;

  constructor(private location: Location, private ruleservice : RuleService, private taskservice :TaskService,private router: Router,private alertController: AlertController) {
    this.rules = new Array<Rule>;
    this.tasks = new Array<Task>;
    this.team = new Team();
    this.rule = new Rule();
    this.task = new Task();
    this.admin = new Admin();
    this.user= new User();

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
    this.listRule();
    this.listTask();
    
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.rules = [];
      this.tasks = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }


  backButton() {
    this.location.back();
  }
  segmentChanged(event: any) {
    this.stato = !this.stato;
  }
  listRule(){
    this.ruleservice.listRule(this.team.codice).subscribe(response =>{
      this.rules = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  listTask(){
    this.taskservice.listAdminTask(this.team.codice).subscribe(response =>{
      this.tasks = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }
  async presentAlert(idTask:number) {
    const alert = await this.alertController.create({
      header: 'Eliminare il task?',
      buttons: [
        {
          text: 'Sì',
          cssClass: 'alert-button-blue',
          handler: () => {
           this.taskservice.deliteTask(idTask,this.team.codice).subscribe(data =>{
            console.log(data);
            this.confirmationAlert();
           });
            
          }
        },
        {
          text: 'No',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }
  async confirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Task eliminato con successo!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }
  async presentAlert1(idRule:number) {
    const alert = await this.alertController.create({
      header: 'Eliminare la regola?',
      buttons: [
        {
          text: 'Sì',
          cssClass: 'alert-button-blue',
          handler: () => {
           this.ruleservice.deliteRule(idRule,this.team.codice).subscribe(data =>{
            console.log(data);
            this.confirmationAlert1();
           });
            
          }
        },
        {
          text: 'No',
          cssClass: 'alert-button-red',
        },
      ],
    });
    await alert.present();
  }
  async confirmationAlert1() {
    const alert = await this.alertController.create({
      header: 'Regola eliminato con successo!',
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