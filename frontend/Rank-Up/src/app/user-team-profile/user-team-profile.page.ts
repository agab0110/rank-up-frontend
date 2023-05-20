import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { UserGetPrizeService } from '../services/userGetPrize/user-get-prize.service';

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
    private userGetPrizeService: UserGetPrizeService
    ) {
    this.user = new User();
    this.team = new Team();
    this.activities = [];
    this.prizes = [];
   }

  ngOnInit() {
    //TODO: inserire local storage quando sarà pronto

    this.taskCompletedService.getTaskCompletedByUser(1,1).subscribe((response) => {
      response.forEach(element => {
        this.activities.push(element);
      });
      console.log(response);
    });

    this.ruleCompletedService.getRulesCompletedByUser(1,1).subscribe((response) => {
      response.forEach(element => {
        this.activities.push(element);
      });
      console.log(response);
    });

    this.userGetPrizeService.getUserPrizes(1,1).subscribe((response) => {
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
