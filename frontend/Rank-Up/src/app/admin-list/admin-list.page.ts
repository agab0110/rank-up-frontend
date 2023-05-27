import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  styleUrls: ['./admin-list.page.scss'],
})
export class AdminListPage implements OnInit {
  users: User[];
  user: User;
  usersJoinsTeam: UserJoinsTeam[];
  team: Team;
  admin: Admin;
  stato = false

  constructor(
    private location: Location,
    private userJoinsTeamService: UserJoinsTeamService
    ) {
      this.users = new Array<User>;
      this.usersJoinsTeam = new Array<UserJoinsTeam>;
      this.team = new Team();
      this.admin = new Admin();
      this.user = new User();
    }

  ngOnInit() {
     //if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
      //this.router.navigate(['user/home']);
      //this.team = JSON.parse(localStorage.getItem('team') || '{}');
      //if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
        //this.router.navigate(['user/home']);
      //this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
      this.getPartecipants(this.team.codice);
      this.getPartecipantsPoints(this.team.codice);
      this.sortDesc();
  }

  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    if(this.stato){
      this.sortAsc();
    }
    if(!this.stato){
      this.sortDesc();
    }
    this.stato = !this.stato;
  }

  getPartecipants(id_team: Number){
    this.userJoinsTeamService.getPartecipants(1).subscribe(result => {
      this.users = result;
      console.log(this.users);
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  getPartecipantsPoints(id_team: Number){
    this.userJoinsTeamService.getPartecipantsPoints(1).subscribe(result => {
      this.usersJoinsTeam = result;
      console.log(this.usersJoinsTeam);
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  clickUser(userJoinTeam: UserJoinsTeam){
    let userJoin = JSON.stringify(userJoinTeam);
    localStorage.setItem("viewUserJoinsTeam", userJoin);
  }

  sortDesc(){
     this.usersJoinsTeam.sort((a, b) =>  b.points - a.points);
  }

  sortAsc(){
    this.usersJoinsTeam.sort((a, b) => a.points - b.points);
  }
}
