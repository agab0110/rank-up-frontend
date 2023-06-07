import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  styleUrls: ['./admin-list.page.scss'],
})
export class AdminListPage implements OnInit {
  users: User[];
  user: User;
  usersJoinsTeam: UserJoinsTeam[];
  userJoinsTeamSearch: any
  team: Team;
  query!: string;
  admin: Admin;
  stato = false;
  statoRicerca = false

  constructor(
    private location: Location,
    private userJoinsTeamService: UserJoinsTeamService,
    private alertController: AlertController,
    private router: Router
    ) {
      this.users = new Array<User>;
      this.usersJoinsTeam = new Array<UserJoinsTeam>;
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
      this.sortDesc();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.usersJoinsTeam = [];
      this.users = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    if (this.stato) {
      this.sortDesc();
      this.statoRicerca = false
    }
    if (!this.stato) {
      this.sortAsc();
      this.statoRicerca = false
    }
    this.stato = !this.stato;
  }

  getPartecipants(id_team: Number){
    this.userJoinsTeamService.getPartecipants(this.team.codice).subscribe(result => {
      this.users = result;
      console.log(this.users);
    }, (error: Response) => {
      if (error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  getPartecipantsPoints(id_team: Number){
    this.userJoinsTeamService.getPartecipantsPoints(this.team.codice).subscribe(result => {
      this.usersJoinsTeam = result;
      console.log(this.usersJoinsTeam);
    }, (error: Response) => {
      if (error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  clickUser(userJoinTeam: UserJoinsTeam) {
    let userJoin = JSON.stringify(userJoinTeam);
    localStorage.setItem("viewUserJoinsTeam", userJoin);
  }

  clickUserId(id: number, username: any, points: number) {
    const userJoinsTeam = new UserJoinsTeam;
    userJoinsTeam.id = id
    userJoinsTeam.user.username = username
    userJoinsTeam.points = points
    let userJoin = JSON.stringify(userJoinsTeam);
    localStorage.setItem("viewUserJoinsTeam", userJoin);
  }

  sortDesc() {
    this.usersJoinsTeam.sort((a, b) => b.points - a.points);
  }

  sortAsc() {
    this.usersJoinsTeam.sort((a, b) => a.points - b.points);
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

  removeUserFromTeam(idUser: number) {
    this.userJoinsTeamService.removeUserFromTeam(this.team.codice, idUser).subscribe(
      (response) => {
        this.removedUserAlert();
        console.log('Utente rimosso dal team con successo');
        // Aggiorna la lista degli utenti del team
        this.getPartecipants(this.team.codice);
        this.handleRefresh(event);
      }
    );
  }

  async confirmRemoveUser(idUser: number) {
    const alert = await this.alertController.create({
      header: 'Sicuro di rimuovere l\'utente dal team?',
      buttons: [
        {
          text: 'Conferma',
          cssClass: 'alert-button-blue',
          handler: () => {
            this.removeUserFromTeam(idUser);
          }
        },
        {
          text: 'Annulla',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }

  async removedUserAlert() {
    const alert = await this.alertController.create({
      header: 'Utente rimosso con successo!',
      message: '',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }
}
