import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

import { PrizeService } from '../services/prize/prize.service';
import { Prize } from '../models/prize/prize';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { UserGetPrizeService } from '../services/userGetPrize/user-get-prize.service';

@Component({
  selector: 'app-prizes-page',
  templateUrl: './prizes-page.page.html',
  styleUrls: ['./prizes-page.page.scss'],
})
export class PrizesPagePage implements OnInit {
  prizes: Prize[];
  user: User;
  userJoin: UserJoinsTeam[];
  team: Team;
  points: Number;
  userJoinsTeam: UserJoinsTeam;
  public user_photo: string | undefined

  constructor(
    private location: Location,
    public alertCtrl: AlertController,
    private prizeService: PrizeService,
    private userGetPrizeService: UserGetPrizeService,
    private userJoinsTeamService: UserJoinsTeamService
  ) {
    this.prizes = new Array<Prize>
    this.user = new User
    this.team = new Team
    this.userJoin = new Array<UserJoinsTeam>;
    this.points = 0;
    this.userJoinsTeam = new UserJoinsTeam;
  }

  async showAlert(name: string, points: number, idPrize: number) {
    const alert = await this.alertCtrl.create({
      message: `Riscuotere "${name}" per ${points} punti?`,
      buttons: [
        {
          text: 'No',
          role: 'no',
          cssClass: 'alert-button-red'
        },
        {
          text: 'Si',
          cssClass: 'alert-button-blue',
          handler: () => {
            this.subtractUserPoints(this.team.codice, this.user.id, idPrize);
            this.userGetPrizeService.addUserPrizes(this.user.id, idPrize).subscribe(data => {
              console.log(data)
            })
          }
        }
      ]
    });
    await alert.present();
  }


  ngOnInit() {
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userJoinsTeam = JSON.parse(localStorage.getItem('userJoinsTeam') || '{}');

    this.user_photo = this.user.photo;

    this.listprize(this.team.codice);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.prizes = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  listprize(idTeam: Number) {
    this.prizeService.listPrize(this.team.codice).subscribe(response => {
      this.prizes = response;
    }, (error: Response) => {
      if (error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  subtractUserPoints(idTeam: number, idUser: number, idPrize: number) {
    this.userJoinsTeamService.subtractUserPoints(idTeam, idUser, idPrize).subscribe(response => {
      console.log(response)
      this.userJoinsTeam = response;
      localStorage.setItem('userJoinsTeam', JSON.stringify(this.userJoinsTeam));
    }, (error: Response) => {
      if (error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  getUsersPoints(idTeam: number) {
    this.userJoinsTeamService.getPartecipantsPoints(this.team.codice).subscribe(response => {
      this.userJoin = response;
    }, (error: Response) => {
      if (error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }
  getPoints(idUser: number) {
    this.userJoin.forEach(element => {
      if (element.user.id = idUser) {
        this.points = element.points;
      }
    });
  }

  backButton() {
    this.location.back();
  }
}
