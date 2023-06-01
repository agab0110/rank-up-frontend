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
  partecipantsPoints: UserJoinsTeam[];
  userJoinsTeamSearch: any
  team: Team;
  admin: Admin;
  user: User;
  points!: number;
  stato = false
  statoRicerca = false

  constructor(
    private router: Router,
    private location: Location,
    private userJoinsTeamService: UserJoinsTeamService
    ) {
      this.partecipantsPoints = new Array<UserJoinsTeam>;
      this.team = new Team();
      this.admin = new Admin();
      this.user = new User();
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
    
    this.getPartecipantsPoints(this.team.codice);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.partecipantsPoints = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.stato = !this.stato;
    this.statoRicerca = false
  }

  getPartecipantsPoints(idTeam: number) {
    this.userJoinsTeamService.getPartecipantsPoints(idTeam).subscribe(response => {
      this.partecipantsPoints = response;
      console.log(this.partecipantsPoints);
    }, (error: Response) => {
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
      this.statoRicerca = true
      this.userJoinsTeamService.getListUserJoinsTeamSearch(this.team.codice, event.target.value).subscribe(data => {
        this.userJoinsTeamSearch = JSON.parse(JSON.stringify(data))
        console.log(data)
      })      
    } else {
      this.statoRicerca = false
      this.getPartecipantsPoints(this.team.codice);
    }
  }
}
