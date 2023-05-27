import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { UserGetPrizeService } from '../services/userGetPrize/user-get-prize.service';
import { Router } from '@angular/router';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { Rule } from '../models/rule/rule';
import { Task } from '../models/task/task';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { TaskCompleted } from '../models/taskCompleted/task-completed';

@Component({
  selector: 'app-user-team-profile',
  templateUrl: './user-team-profile.page.html',
  styleUrls: ['./user-team-profile.page.scss'],
})
export class UserTeamProfilePage implements OnInit {
  stato = true; 

  activities: any;
  rules: RuleCompleted[];
  tasks: TaskCompleted[];
  prizes: any[];

  user: User;
  team: Team;
  userJoinsTeam: UserJoinsTeam;

  constructor(
    private location: Location,
    private taskCompletedService: TaskCompletedService,
    private ruleCompletedService: RuleCompletedService,
    private userGetPrizeService: UserGetPrizeService,
    private router: Router
    ) {
    this.user = new User();
    this.team = new Team();
    this.userJoinsTeam = new UserJoinsTeam();
    this.activities = [];
    this.rules = [];
    this.tasks = [];
    this.prizes = [];
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.userJoinsTeam = JSON.parse(localStorage.getItem('userJoinsTeam') || '{}');
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    if (localStorage.getItem('team') == null || localStorage.getItem('userJoinsTeam') == null) {
      this.router.navigate(["/user/home"]);
    }

    this.taskCompletedService.getTaskCompletedByUser(this.user.id, this.team.codice).subscribe((response) => {
      this.tasks = response;
      response.forEach(element => {
        this.activities.push(element);
      });
      console.log(response);
    });

    this.ruleCompletedService.getRulesCompletedByUser(this.user.id, this.team.codice).subscribe((response) => {
      this.rules = response;
      response.forEach(element => {
        this.activities.push(element);
      });
      console.log(response);
    });

    this.userGetPrizeService.getUserPrizes(this.user.id, this.team.codice).subscribe((response) => {
      response.forEach(element => {
        this.prizes.push(element);
      });
      console.log(response);
    });
  }

  ruleOrTask(activity: any) {
    if (this.rules.includes(activity)) {
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
}
