import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user/user';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { Router } from '@angular/router';
import { Team } from '../models/team/team';
import { UserGetPrizeService } from '../services/userGetPrize/user-get-prize.service';
import { Prize } from '../models/prize/prize';
import { Rule } from '../models/rule/rule';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { Task } from '../models/task/task';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';

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
  rules: Rule[];
  tasks: Task[];

  ngOnInit() {
    //if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.getItem('viewUser');
      localStorage.getItem('viewUserJoinsTeam');
      this.userProfile = JSON.parse(localStorage.getItem('viewUser') || '{}');
      this.userJoin = JSON.parse(localStorage.getItem('viewUserJoinsTeam') || '{}')

      this.getUserRules();
      this.getUserTasks();
  }

  constructor(
    private location: Location,
    private router: Router,
    private userGetPrizeService: UserGetPrizeService,
    private taskCompletedService: TaskCompletedService,
    private ruleCompletedService: RuleCompletedService
    ) {
      this.userProfile = new User();
      this.user = new User();
      this.team = new Team();
      this.prizes = [];
      this.userJoin = new UserJoinsTeam();
      this.rules = [];
      this.tasks = [];
     }

  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.stato = !this.stato;
  }

  getUserPrizes(){
  this.userGetPrizeService.getUserPrizes(this.userProfile.id, /*this.team.codice*/1).subscribe(
    (response: any) => {
      this.prizes = response;
      console.log(this.prizes);
    }, (error: Response) => {
      if(error.status == 400) {
        console.log("400 error");
      }
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  getUserRules(){
    this.ruleCompletedService.getRulesCompletedByUser(this.userProfile.id, /*this.team.codice*/1).subscribe(response => {
      this.rules = response;
      console.log(this.tasks);
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
    this.taskCompletedService.getTaskCompletedByUser(this.userProfile.id, /*this.team.codice*/1).subscribe(response => {
      this.tasks = response;
      console.log(this.tasks);
    }), (error: Response) => {
      if (error.status == 400) {
        console.log("Error 400");
      } else {
        console.log("Unexpected error")
      }
      console.log(error);
    }
  }


}
