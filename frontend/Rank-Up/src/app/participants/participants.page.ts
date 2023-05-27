import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { Admin } from '../models/admin/admin';
import { Team } from '../models/team/team';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { User } from '../models/user/user';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {
  partecipants: User[];
  partecipantsPoints: UserJoinsTeam[];
  team: Team;
  admin: Admin;
  user: User;
  points!: number;

  constructor(
    private router: Router,
    private location: Location,
    private userJoinsTeamService: UserJoinsTeamService
    ) {
      this.partecipants = new Array<User>;
      this.partecipantsPoints = new Array<UserJoinsTeam>;
      this.team = new Team();
      this.admin = new Admin();
      this.user = new User();
    }

  stato = false

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
    
    this.getPartecipants(this.team.codice);
    this.getPartecipantsPoints(this.team.codice);
  }

  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.stato = !this.stato;
  }

  getPartecipants(idTeam: number) {
    this.userJoinsTeamService.getPartecipants(idTeam).subscribe(response => {
      this.partecipants = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  getPartecipantsPoints(idTeam: number) {
    this.userJoinsTeamService.getPartecipantsPoints(idTeam).subscribe(response => {
      this.partecipantsPoints = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

}
