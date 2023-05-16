import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { Team } from '../models/team/team';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.page.html',
  styleUrls: ['./request-history.page.scss'],
})
export class RequestHistoryPage implements OnInit {
  rulecompleted: RuleCompleted[];
  ruleRejected: RuleCompleted[];
  taskCompleted: TaskCompleted[];
  taskRejected: TaskCompleted[];
  team: Team;
  filter: number = 1;
  data: any;
  idTeam: any = 1;

  constructor(
    private alertController: AlertController,
    private location: Location,
    private rulecompletedservice: RuleCompletedService,
    private taskcompletedservice: TaskCompletedService,
    private ruleCompletedService: RuleCompletedService
    ) {
      this.rulecompleted = new Array<RuleCompleted>;
      this.ruleRejected = new Array<RuleCompleted>;
      this.taskCompleted = new Array<TaskCompleted>;
      this.taskRejected = new Array<TaskCompleted>;
      this.team = new Team();
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

  ngOnInit() {
    if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    //if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
    //this.router.navigate(['user/home']);
    //this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
  }
  
  backButton() {
    this.location.back();
  }

  ruleComleleted(){
    this.rulecompletedservice.ruleAccepted(1).subscribe(Response =>{
      this.rulecompleted = Response;
    },(error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
      });
  }

  rulerejected(){
    this.rulecompletedservice.rulerejected(1).subscribe(Response =>{
      this.ruleRejected = Response;
    },(error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
      });
  }

  taskAccepted(){
    this.taskcompletedservice.taskAccepted(1).subscribe(Response =>{
      this.taskCompleted = Response;
    },(error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
      });
  }

  taskrejected(){
    this.taskcompletedservice.taskRejected(1).subscribe(Response =>{
      this.taskRejected = Response;
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
