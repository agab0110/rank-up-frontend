import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TeamService } from '../services/team/team.service';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { User } from '../models/user/user';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.page.html',
  styleUrls: ['./search-team.page.scss'],
})
export class SearchTeamPage implements OnInit {

  teams: any;
  public user: User;

  constructor(
    private alertController: AlertController,
    private userJoinsTeamService: UserJoinsTeamService,
    private router: Router,
    private location: Location,
    private teamService: TeamService
  ) { 
    this.user = new User();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.getTeams()
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.teams = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  backButton() {
    this.location.back();
  }

  async presentAlert(idTeam: number) {
    const alert = await this.alertController.create({
      header: 'Vuoi unirti al Team?',
      buttons: [
        {
          text: 'Sì',
          cssClass: 'alert-button-blue',
          handler: () => {
            this.joinPublicTeam();
            this.userJoinsTeamService.addUser(idTeam, this.user.id).subscribe(data => {
              console.log(data)
              this.router.navigate(['user/home']);
            })
          }
        },
        {
          text: 'No',
          cssClass: 'alert-button-red',
        },
      ],
    });
    await alert.present();
  }

  getTeams() {
    this.teamService.getAllTeams(this.user.id).subscribe(data => {
      this.teams = JSON.parse(JSON.stringify(data))
    })
  }

  ricerca(event: any) {
    if(event.target.value != "") {
      this.teamService.getTeam(this.user.id, event.target.value.toLowerCase()).subscribe(data => {
        this.teams = JSON.parse(JSON.stringify(data))

        console.log(data)
      })      
    } else {
      this.getTeams()
    }
  }

  async joinPublicTeam() {
    const alert = await this.alertController.create({
      header: 'Accesso al team effettuato!',
      message: '',
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
