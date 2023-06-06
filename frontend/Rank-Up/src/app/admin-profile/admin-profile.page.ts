import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user/user';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { NavigationExtras, Router } from '@angular/router';
import { Team } from '../models/team/team';
import { UserGetPrizeService } from '../services/userGetPrize/user-get-prize.service';
import { Prize } from '../models/prize/prize';
import { Rule } from '../models/rule/rule';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { Task } from '../models/task/task';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {
  user: User;
  userJoin: UserJoinsTeam;
  stato = false;
  userProfile: User;
  team: Team;
  prizes: Prize[];
  rulesCompleted: RuleCompleted[];
  tasksCompleted: TaskCompleted[];
  activities: any[];
  task:Task;
  rules:Rule;

  ngOnInit() {
    //if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    localStorage.getItem('viewUserJoinsTeam');
    this.userJoin = JSON.parse(localStorage.getItem('viewUserJoinsTeam') || '{}')

    this.getUserPrizes();
    this.getUserRules();
    this.getUserTasks();
  }

  constructor(
    private location: Location,
    private router: Router,
    private userGetPrizeService: UserGetPrizeService,
    private taskCompletedService: TaskCompletedService,
    private ruleCompletedService: RuleCompletedService,
    private navCtrl: NavController
  ) {
    this.userProfile = new User();
    this.user = new User();
    this.team = new Team();
    this.prizes = [];
    this.userJoin = new UserJoinsTeam();
    this.rulesCompleted = [];
    this.tasksCompleted = [];
    this.activities = [];
    this.task = new Task();
    this.rules = new Rule();
  }

  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.stato = !this.stato;
  }

  getUserPrizes() {
    this.userGetPrizeService.getUserPrizes(this.userJoin.user.id, this.team.codice).subscribe(
      (response: any) => {
        this.prizes = response;
        console.log(this.prizes);
      }), (error: Response) => {
        if (error.status == 400) {
          console.log("400 error");
        }
        else {
          console.log('An unexpected error occured');
        }
        console.log(error);
      };
  }

  getUserRules() {
    this.ruleCompletedService.getRulesCompletedByUser(this.userJoin.user.id, this.team.codice).subscribe(response => {
      this.rulesCompleted = response;
      response.forEach(element => {
        this.activities.push(element);
      });
      console.log(this.tasksCompleted);
    }), (error: Response) => {
      if (error.status == 400) {
        console.log("Error 400");
      } else {
        console.log("Unexpected error")
      }
      console.log(error);
    }
  }

  getUserTasks() {
    this.taskCompletedService.getTaskCompletedByUser(this.userJoin.user.id, this.team.codice).subscribe(response => {
      this.tasksCompleted = response;
      response.forEach(element => {
        this.activities.push(element);
      });
      console.log(this.tasksCompleted);
    }), (error: Response) => {
      if (error.status == 400) {
        console.log("Error 400");
      } else {
        console.log("Unexpected error")
      }
      console.log(error);
    }
  }

  ruleOrTask(activity: any) {
    if (this.rulesCompleted.includes(activity)) {
      return true;
    }
    else {
      return false;
    }
  }

  goToTask(task: TaskCompleted) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        taskId: task.id
      }
    };
    this.navCtrl.navigateForward(['/completed-task'], navigationExtras);
  }

  goToRule(rule: RuleCompleted) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ruleId: rule.id
      }
    };
    this.navCtrl.navigateForward(['/admin-rule-completed'], navigationExtras);
  }
  clickRule(rule:RuleCompleted) {
    let rules = JSON.stringify(rule);
    localStorage.setItem("viewRule", rules);
  }

  clickTask(task:TaskCompleted) {
    let tasks = JSON.stringify(task);
    localStorage.setItem("viewTask", tasks);
  }
}
