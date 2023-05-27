import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { UserGetPrizeService } from '../services/userGetPrize/user-get-prize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-team-profile',
  templateUrl: './user-team-profile.page.html',
  styleUrls: ['./user-team-profile.page.scss'],
})
export class UserTeamProfilePage implements OnInit {
  stato = true; 

  activities: any;
  prizes: any[];

  user: User;
  team: Team;

  constructor(
    private location: Location,
    private taskCompletedService: TaskCompletedService,
    private ruleCompletedService: RuleCompletedService,
    private userGetPrizeService: UserGetPrizeService,
    private router: Router
    ) {
    this.user = new User();
    this.team = new Team();
    this.activities = [];
    this.prizes = [];
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }

    this.taskCompletedService.getTaskCompletedByUser(this.user.id, this.team.codice).subscribe((response) => {
      response.forEach(element => {
        this.activities.push(element);
      });
      console.log(response);
    });

    this.ruleCompletedService.getRulesCompletedByUser(this.user.id, this.team.codice).subscribe((response) => {
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

  segmentChanged(event:any) {
    this.stato = !this.stato
  }

  backButton() {
    this.location.back();
  }
}
