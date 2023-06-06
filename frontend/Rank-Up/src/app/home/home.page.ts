import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { TeamService } from '../services/team/team.service';
import { Team } from '../models/team/team';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { AdminService } from '../services/admin/admin.service';
import { Admin } from '../models/admin/admin';
import { AlertController } from '@ionic/angular';
import { NotificationService } from '../services/notification/notification.service';
import { Notification } from '../models/notification/notification';
import { AdminReciveNotificationService } from '../services/adminReciveNotification/admin-recive-notification.service';

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
  codeTeamInput!: string;
  notification: Notification;
  admins: Admin[];
  searchedTeam!: Team;
  isJoinRequestAlertOpen: boolean = false;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private userJoinsTeamService: UserJoinsTeamService,
    private adminService: AdminService,
    private alertController: AlertController,
    private notificationService: NotificationService,
    private adminReciveNotificationService: AdminReciveNotificationService
  ) {
    this.user = new User();
    this.teamsUser = [];
    this.teamsAdmin = [];
    this.teams = [];
    this.notification = new Notification();
    this.admins = [];
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

  getTeam() {
    this.teamService.getTeamByCode(this.codeTeamInput).subscribe(result => {
      this.searchedTeam = result;
    },(error: Response) => {
      if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  addTeam() {
    this.userJoinsTeamService.addUserByCOde(this.codeTeamInput, this.user.id).subscribe(data => {
      this.joinRequest();
      console.log(data);
      this.sendNotification();
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

  sendNotification() {
    this.notification.title = "Richiesta d'accesso";
    this.notification.description = "L'utente " + this.user.username +  " ha richiesto l'accesso al team " + this.searchedTeam.name;
    this.notificationService.newNotification(this.notification, this.searchedTeam.codice).subscribe(n => {
      console.log(n);
      this.getAdmins();
      this.addAdminNotification(n);
    },(error: Response) => {
      if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  getAdmins() {
    this.adminService.getAdmins(this.searchedTeam.codice).subscribe(result => {
      this.admins = result;
      console.log(this.admins);
    },(error: Response) => {
      if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  addAdminNotification(n: Notification){
    this.admins.forEach(admin => {
      this.adminReciveNotificationService.addNotification(admin.id, n.id).subscribe(n => {
        console.log(n);
      },(error: Response) => {
        if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);});
    });
  }

  async joinRequest() {
    const alert = await this.alertController.create({
      header: 'Richiesta inviata!',
      message: 'Attendi che l\' admin ti aggiunga.',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-blue',
        },
      ],
    });

    await alert.present();
  }
}
