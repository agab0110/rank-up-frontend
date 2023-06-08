import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { Team } from '../models/team/team';
import { User } from '../models/user/user';
import { Admin } from '../models/admin/admin';
import { Router } from '@angular/router';
import { Task } from '../models/task/task';
import { Rule } from '../models/rule/rule';
import { UserGetPrizeService } from '../services/userGetPrize/user-get-prize.service';
import { UserGetPrize } from '../models/userGetPrize/user-get-prize';

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

  prizes: UserGetPrize[];
  activitySort: any;
  team: Team;
  stato = 0;
  user: User;
  admin: Admin;
  filter: number = 1;
  data: any;
  idTeam: any = 1;
  classAccepted: string = "itemuser";
  classRejected: string = "itemadmin";
  iconAccepted: string = "checkmark-circle-outline";
  iconRejected: string = "close-circle-outline";
  segmentValue: string = "rule";
  task: Task;
  rules: Rule;
  checkRuleCompletedList: boolean;
  checkRuleRejectedList: boolean;
  checkTaskCompletedList: boolean;
  checkTaskRejectedList: boolean;

  constructor(
    private alertController: AlertController,
    private location: Location,
    private ruleCompletedService : RuleCompletedService,
    private taskCompletedService : TaskCompletedService,
    private prizeService: UserGetPrizeService,
    private router: Router) {
      this.rulesCompleted = new Array<RuleCompleted>;
      this.rulesRejected = new Array<RuleCompleted>;
      this.tasksCompleted = new Array<TaskCompleted>;
      this.tasksRejected = new Array<TaskCompleted>;
      this.prizes = new Array<UserGetPrize>();

      this.team = new Team();
      this.user = new User();
      this.admin = new Admin();
      this.task = new Task();
      this.rules = new Rule();
      this.checkRuleCompletedList = true;
      this.checkRuleRejectedList = true;
      this.checkTaskCompletedList = true;
      this.checkTaskRejectedList = true;
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

    this.getRulesCompleted();
    this.getRulesRejected();

      this.getTaskAccepted();
      this.getTaskRejected();

      this.getPrizes();
    }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.rulesCompleted = [];
      this.rulesRejected = [];
      this.tasksCompleted = [];
      this.tasksRejected = [];
      this.prizes = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
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
    this.prizes.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
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
    this.prizes.sort((a, b) => {
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
    this.prizes.sort((a, b) => {
      if (a.prize.name > b.prize.name) {
        return 1;
      }
      if (a.prize.name < b.prize.name) {
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
        if (this.filter === 1)
          this.sortByUsername();
        else if (this.filter === 2)
          this.sortByData();
        else
          this.sortByActivity();
        break;
      case 'task':
        if (this.filter === 1)
          this.sortByUsername();
        else if (this.filter === 2)
          this.sortByData();
        else
          this.sortByActivity();
        break;
      case 'prize':
        if (this.filter === 1)
          this.sortByUsername();
        else if (this.filter === 2)
          this.sortByData();
        else
          this.sortByActivity();
        break;
      default:
        break;
    }
  }

  getRulesCompleted() {
    this.ruleCompletedService.ruleAccepted(this.team.codice).subscribe(Response => {
      this.rulesCompleted = Response;
      this.sortByUsername();
      console.log(this.rulesCompleted);
    }, (error: Response) => {
      if (error.status == 400) {
        console.log("400 error");
        this.checkRuleCompletedList = false;
      }
      else {
        console.log('An unexpected error occured');
        this.checkRuleCompletedList = false;
      }
      console.log(error);
    });
  }

  getRulesRejected() {
    this.ruleCompletedService.rulerejected(this.team.codice).subscribe(Response => {
      this.rulesRejected = Response;
      this.sortByUsername();
      console.log(this.rulesRejected);
    }, (error: Response) => {
      if (error.status == 400) {
        this.checkRuleRejectedList = false;
        console.log("400 error");
      }
      else {
        console.log('An unexpected error occured');
        this.checkRuleRejectedList = false;
      }
      console.log(error);
    });
  }

  getTaskAccepted() {
    this.taskCompletedService.taskAccepted(this.team.codice).subscribe(Response => {
      this.tasksCompleted = Response;
      this.sortByUsername();
      console.log(this.tasksCompleted);
    }, (error: Response) => {
      if (error.status == 400) {
        this.checkTaskCompletedList = false;
        console.log("400 error");
      }
      else {
        console.log('An unexpected error occured');
        this.checkTaskCompletedList = false;
      }
      console.log(error);
    });
  }

  getTaskRejected() {
    this.taskCompletedService.taskRejected(this.team.codice).subscribe(Response => {
      this.tasksRejected = Response;
      this.sortByUsername();
      console.log(this.tasksCompleted);
    }, (error: Response) => {
      if (error.status == 400) {
        this.checkTaskRejectedList = false;
        console.log("400 error");
      }
      else {
        console.log('An unexpected error occured');
        this.checkTaskRejectedList = false;
      }
      console.log(error);
    });
  }

  getPrizes() {
    this.prizeService.getTeamPrizes(this.team.codice).subscribe(response =>{
      this.prizes = response;
      this.sortByUsername();
      console.log(this.prizes);
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
    const query = event.target.value.toLowerCase();
    if(query == ""){
      this.ngOnInit()
    }
    this.rulesCompleted = this.rulesCompleted.filter((d) => d.user.username.toLowerCase().indexOf(query) > -1);
    this.rulesRejected = this.rulesRejected.filter((d) => d.user.username.toLowerCase().indexOf(query) > -1);
    this.tasksCompleted = this.tasksCompleted.filter((d) => d.user.username.toLowerCase().indexOf(query) > -1);
    this.tasksRejected = this.tasksRejected.filter((d) => d.user.username.toLowerCase().indexOf(query) > -1);
  }
  clickRule(rule: RuleCompleted) {
    let rules = JSON.stringify(rule);
    localStorage.setItem("viewRule", rules);
  }

  clickTask(task: TaskCompleted) {
    let tasks = JSON.stringify(task);
    localStorage.setItem("viewTask", tasks);
  }
}
