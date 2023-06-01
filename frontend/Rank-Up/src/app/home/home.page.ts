import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { TeamService } from '../services/team/team.service';
import { Team } from '../models/team/team';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { AdminService } from '../services/admin/admin.service';
import { Admin } from '../models/admin/admin';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  user: User;
  teamsUser: Team[];
  teamsAdmin: Team[];
  teams: Team[];
  codeTeamInput: any

  constructor(
    private router: Router,
    private teamService: TeamService,
    private userJoinsTeamService: UserJoinsTeamService,
    private adminService: AdminService,
    private alertController: AlertController,
  ) {
    this.user = new User();
    this.teamsUser = [];
    this.teamsAdmin = [];
    this.teams = [];
  }

  ngOnInit() {
    localStorage.setItem('team', '');
    localStorage.setItem('admin', '');
    localStorage.setItem('userJoinsTeam', '');
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

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.teamsUser = [];
      this.teamsAdmin = [];
      this.teams = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  team() {
    this.router.navigate(['team'])
  }

  newTeam() {
    const team = new Team();
    this.teamService.newTeam(team);
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Codice Team non valido!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Ora fai parte del Team con codice: ' + this.codeTeamInput,
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-blue' ,
        },
      ],
    });

    await alert.present();
  }

  goToTeamUser(team: Team) {
    localStorage.setItem('team', JSON.stringify(team));
    this.userJoinsTeamService.getPartecipantsPoints(team.codice).subscribe(response => {
      response.forEach(userJoinsTeam => {
        if (userJoinsTeam.user.id == this.user.id) {
          localStorage.setItem('userJoinsTeam', JSON.stringify(userJoinsTeam));
        }
      });
    });
    this.router.navigate(['/user/team']);
  }

  goToTeamAdmin(team: Team) {
    localStorage.setItem('team', JSON.stringify(team));
    let admin = new Admin();
    this.adminService.getAdmin(team.codice, this.user.id).subscribe(response => {
      admin = response;
      localStorage.setItem('admin', JSON.stringify(admin));
    });
    this.router.navigate(['/admin/admin-home-team']);
  }

  userOrAdmin(team: Team) {
    if (this.teamsUser.includes(team))
      return true;
    else
      return false;
  }

  addTeam() {
    this.userJoinsTeamService.addUserByCOde(this.codeTeamInput, this.user.id).subscribe(data => {
      console.log(data)
      this.confirmationAlert();
    }, (error: Response) => {
      if(error.status == 400){
        this.errorAlert();
        console.log("400 error");
      }
      else {
        this.errorAlert();
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }
}
