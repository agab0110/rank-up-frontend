import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { UserGetPrizeService } from '../services/userGetPrize/user-get-prize.service';
import { NavigationExtras, Router } from '@angular/router';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-team-profile',
  templateUrl: './user-team-profile.page.html',
  styleUrls: ['./user-team-profile.page.scss'],
})
export class UserTeamProfilePage implements OnInit {
  stato = true; 

  activities: any;
  rulesCompleted: RuleCompleted[];
  tasksCompleted: TaskCompleted[];
  prizes: any[];

  user: User;
  team: Team;
  userJoinsTeam: UserJoinsTeam;

  constructor(
    private location: Location,
    private taskCompletedService: TaskCompletedService,
    private ruleCompletedService: RuleCompletedService,
    private userGetPrizeService: UserGetPrizeService,
    private router: Router,
    private navCtrl: NavController

    ) {
    this.user = new User();
    this.team = new Team();
    this.userJoinsTeam = new UserJoinsTeam();
    this.activities = [];
    this.rulesCompleted = [];
    this.tasksCompleted = [];
    this.prizes = [];
   }

  ngOnInit() {
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.userJoinsTeam = JSON.parse(localStorage.getItem('userJoinsTeam') || '{}');
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    if (localStorage.getItem('team') == null || localStorage.getItem('userJoinsTeam') == null) {
      this.router.navigate(["/user/home"]);
    }
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    };

    this.taskCompletedService.getTaskCompletedByUser(this.user.id, this.team.codice).subscribe((response) => {
      this.tasksCompleted = response;
      response.forEach(element => {
        this.activities.push(element);
      });
      console.log(response);
    });

    this.ruleCompletedService.getRulesCompletedByUser(this.user.id, this.team.codice).subscribe((response) => {
      this.rulesCompleted = response;
      response.forEach(element => {
        this.activities.push(element);
      });
      console.log(response);
    });

    this.userGetPrizeService.getUserPrizes(this.user.id,this.team.codice).subscribe((response) => {
      response.forEach(element => {
        this.prizes.push(element);
      });
      console.log(response);
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.rulesCompleted = [];
      this.tasksCompleted = [];
      this.prizes = [];
      this.activities = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  ruleOrTask(activity: any) {
    if (this.rulesCompleted.includes(activity)) {
      return true;
    }
    else {
      return false;
    }
  }

  segmentChanged(event:any) {
    this.stato = !this.stato
  }

  backButton() {
    this.location.back();
  }

  goToTask(task: TaskCompleted) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        taskId: task.id
      }
    };
    this.navCtrl.navigateForward(['/task-completed'], navigationExtras);
  }

  goToRule(rule: RuleCompleted) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        ruleId: rule.id
      }
    };
    this.navCtrl.navigateForward(['/user-rule-completed'], navigationExtras);
  }
}
