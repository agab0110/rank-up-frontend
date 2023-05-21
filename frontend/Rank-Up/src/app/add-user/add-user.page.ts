import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserService } from '../services/user/user.service';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { AdminService } from '../services/admin/admin.service';

import { User } from '../models/user/user';
import { Admin } from '../models/admin/admin';
import { Team } from '../models/team/team';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  users : User[];
  team: Team;
  admin: Admin;
  query!: string;
  id_user!: Number;
  user : User;
  idTeam! : number;
  responseData: any;

  constructor(
    private location: Location,
    private userService: UserService,
    private userJoinsTeam: UserJoinsTeamService,
    private adminService: AdminService,
    ) {

    this.users = new Array<User>;
    this.team = new Team();
    this.admin = new Admin();
    this.user = new User();
  }

  ngOnInit() {
    //if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
      //this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
      //this.router.navigate(['user/home']);
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.getUsers();
  }

  backButton() {
    this.location.back();
  }

  public getUsers(){
    this.userService.getAllUsers().subscribe(response =>{
      this.users = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  searchUser() {
    if(this.query == ""){
      this.getUsers();
    }
    this.userJoinsTeam.getListUserSearch(this.query).subscribe(response => {
      this.users = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  addAdmin(idUser: number, idTeam:number) {
    idTeam = 1;
    this.adminService.newAdmin(idUser, idTeam).subscribe(response => {
      console.log("Admin aggiunto con successo");
      console.log(response);
    }, (error: Response) => {
      if( error.status == 400)
      console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

}
