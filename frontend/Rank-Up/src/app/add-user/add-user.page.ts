import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserService } from '../services/user/user.service';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { AdminService } from '../services/admin/admin.service';

import { User } from '../models/user/user';
import { Admin } from '../models/admin/admin';
import { Team } from '../models/team/team';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  users: any;
  team: Team;
  admin: Admin;
  query!: string;
  idUser!: number;
  user: User;
  idTeam!: number;
  responseData: any;

  constructor(
    private location: Location,
    private userService: UserService,
    private userJoinsTeamService: UserJoinsTeamService,
    private adminService: AdminService,
    private router: Router
  ) {

    this.users = new Array<User>;
    this.team = new Team();
    this.admin = new Admin();
    this.user = new User();
  }

  ngOnInit() {
    localStorage.setItem('admin', '');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }

    this.getNewUsers();
  }

  backButton() {
    this.location.back();
  }

  public getNewUsers() {
    this.userService.getNewUsers(this.team.codice).subscribe(response => {
      this.users = response;
    });
  }

  searchUser() {
    if (this.query == "") {
      this.getNewUsers();
    }
    this.userJoinsTeamService.getListUserSearch(this.query).subscribe(response => {
      this.users = response;
    })
  }

  addAdmin(idUser: number) {
    this.idUser = idUser;

    this.adminService.newAdmin(idUser, this.team.codice).subscribe(response => {
      console.log("Admin aggiunto con successo");
      this.getNewUsers();
    })

    this.getNewUsers();
  }

  /*addUser(){
    this.userJoinsTeamService.addUser(this.idUser,this.idTeam).subscribe(response => {
      console.log("User aggiunto con successo");
      console.log(response);
    }, (error: Response) => {
      if( error.status == 400)
      console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }*/

  addUser(idUser: number) {
    this.idUser = idUser;

    this.userJoinsTeamService.addUser(this.team.codice, idUser).subscribe(response => {
      console.log("Utente inserito");
      this.getNewUsers();
    })

    this.getNewUsers();
  }

}
