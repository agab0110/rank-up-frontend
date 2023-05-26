import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { Team } from '../models/team/team';
import { Prize } from '../models/prize/prize';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.page.html',
  styleUrls: ['./request-history.page.scss'],
})
export class RequestHistoryPage implements OnInit {

  rulesCompleted: RuleCompleted[];
  rulesRejected: RuleCompleted[];
  tasksCompleted: TaskCompleted[];
  tasksRejected: TaskCompleted[];

  prizes: Prize[];
  activitySort: any;
  team: Team;
  stato = 0;

  filter: number = 1;
  data: any;
  idTeam: any = 1;
  classAccepted: string = "itemuser";
  classRejected: string = "itemadmin";
  iconAccepted: string = "checkmark-circle-outline";
  iconRejected: string = "close-circle-outline";
  segmentValue: string = "rule";

  constructor(
    private alertController: AlertController,
    private location: Location,
    private ruleCompletedService : RuleCompletedService,
    private taskCompletedService : TaskCompletedService) {
      this.rulesCompleted = new Array<RuleCompleted>;
      this.rulesRejected = new Array<RuleCompleted>;
      this.tasksCompleted = new Array<TaskCompleted>;
      this.tasksRejected = new Array<TaskCompleted>;

      this.team = new Team();
      this.prizes = new Array<Prize>;
     }

     ngOnInit() {
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
    }


  sortByData() {
    this.rulesCompleted.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      return 0;
    });
    this.rulesRejected.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      return 0;
    });
    this.tasksCompleted.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      return 0;
    });
    this.tasksRejected.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return 1;
      }
      if (a.timestamp < b.timestamp) {
        return -1;
      }
      return 0;
    });
  }

  sortByUsername() {
    this.rulesCompleted.sort((a, b) => {
      if (a.user.username > b.user.username) {
        return 1;
      }
      if (a.user.username < b.user.username) {
        return -1;
      }
      return 0;
    });
    this.rulesRejected.sort((a, b) => {
      if (a.user.username > b.user.username) {
        return 1;
      }
      if (a.user.username < b.user.username) {
        return -1;
      }
      return 0;
    });
    this.tasksCompleted.sort((a, b) => {
      if (a.user.username > b.user.username) {
        return 1;
      }
      if (a.user.username < b.user.username) {
        return -1;
      }
      return 0;
    });
    this.tasksRejected.sort((a, b) => {
      if (a.user.username > b.user.username) {
        return 1;
      }
      if (a.user.username < b.user.username) {
        return -1;
      }
      return 0;
    });
  }

  sortByActivity() {
    this.rulesCompleted.sort((a, b) => {
      if (a.rule.name > b.rule.name) {
        return 1;
      }
      if (a.rule.name < b.rule.name) {
        return -1;
      }
      return 0;
    });
    this.rulesRejected.sort((a, b) => {
      if (a.rule.name > b.rule.name) {
        return 1;
      }
      if (a.rule.name < b.rule.name) {
        return -1;
      }
      return 0;
    });
    this.tasksCompleted.sort((a, b) => {
      if (a.task.name > b.task.name) {
        return 1;
      }
      if (a.task.name < b.task.name) {
        return -1;
      }
      return 0;
    });
    this.tasksRejected.sort((a, b) => {
      if (a.task.name > b.task.name) {
        return 1;
      }
      if (a.task.name < b.task.name) {
        return -1;
      }
      return 0;
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Filtra per:',
      buttons: [
        {
          text: 'Nome Utente',
          cssClass: this.filter === 1 ? 'alert-button-red' : 'alert-button-blue',
          handler: () => {
            this.filter = 1;
            this.sortByUsername();
          }
        },
        {
          text: 'Data di consegna',
          cssClass: this.filter === 2 ? 'alert-button-red' : 'alert-button-blue',
          handler: () => {
            this.filter = 2;
            this.sortByData();
          }
        },
        {
          text: 'Nome attività',
          cssClass: this.filter === 3 ? 'alert-button-red' : 'alert-button-blue',
          handler: () => {
            this.filter = 3;
            //this.rulesCompleted= this.sortByActivityName();
            this.sortByActivity();
          }
        },
      ],
    });

    await alert.present();
  }


  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    const selectedValue = event.detail.value;

    switch (selectedValue) {
      case 'rule':
        break;
      case 'task':
        this.getTaskAccepted();
        //this.getTaskRejected();
        break;
      case 'prize':
        break;
      default:
        break;
    }
  }

  getRulesCompleted(){
    this.ruleCompletedService.ruleAccepted(/*this.team.codice*/1).subscribe(Response =>{
      this.rulesCompleted = Response;
      console.log(this.rulesCompleted);
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
      this.rulesRejected = Response;
      console.log(this.rulesRejected);
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
      this.tasksCompleted = Response;
      console.log(this.tasksCompleted);
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
    this.taskCompletedService.taskRejected(/*this.team.codice1*/1).subscribe(Response =>{
      this.tasksRejected = Response;
      console.log(this.tasksCompleted);
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

  /*sortByActivityName(){       //API 22 FUNZIONA SOLO PER LE REGOLE COMPLETATE
    let sortList: (RuleCompleted)[] = [];
      this.rulesCompleted.forEach((element : RuleCompleted) => {
        sortList.push(element);
      });
    console.log(sortList);
    sortList.sort((a, b) => a.rule.name.localeCompare(b.rule.name));
    return sortList;
  }*/
}
