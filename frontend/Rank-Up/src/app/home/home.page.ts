import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { TeamService } from '../services/team/team.service';
import { Team } from '../models/team/team';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { AdminService } from '../services/admin/admin.service';
import { Admin } from '../models/admin/admin';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: User;
  teamsUser: Team[];
  teamsAdmin: Team[];
  teams: Team[];

  constructor(
    private router: Router,
    private teamService: TeamService,
    private userJoinsTeamService: UserJoinsTeamService,
    private adminService: AdminService
    ) {
    this.user = new User();
    this.teamsUser = [];
    this.teamsAdmin = [];
    this.teams = [];
  }

  ngOnInit() {
    localStorage.setItem('teamId', '');
    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.userJoinsTeamService.getTeams(this.user.id).subscribe(response => {
      this.teamsUser = response;
      this.teamsUser.forEach(team => {
        this.teams.push(team);
      });
      this.teams.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        else if (a.name < b.name) {
          return -1;
        }
        else {
          return 0;
        }
      });
      console.log(this.teamsUser);
    });

    this.adminService.getTeams(this.user.id).subscribe(response => {
      this.teamsAdmin = response;
      this.teamsAdmin.forEach(team => {
        this.teams.push(team);
      });
      this.teams.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        else if (a.name < b.name) {
          return -1;
        }
        else {
          return 0;
        }
      });
      console.log(this.teamsAdmin);
    });

    console.log(this.teams);
  }

  team() {
    this.router.navigate(['team'])
  }

  newTeam() {
    const team = new Team();
    this.teamService.newTeam(team);
  }

  goToTeamUser(team: Team) {
    localStorage.setItem('team', JSON.stringify(team));
    this.router.navigate(['/user/team']);
  }

  goToTeamAdmin(team: Team) {
    localStorage.setItem('team', JSON.stringify(team));
    let admin = new Admin();
    this.adminService.getAdmin(team.codice, this.user.id).subscribe(response => {
      admin = response;
      console.log(admin);
    });
    localStorage.setItem('admin', JSON.stringify(admin));
    this.router.navigate(['/admin/admin-home-team']);
  }

  userOrAdmin(team: Team) {
    if(this.teamsUser.includes(team))
      return true;
    else
      return false;
  }
}
