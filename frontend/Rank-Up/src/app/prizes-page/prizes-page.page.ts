import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { PrizeService } from '../services/prize/prize.service';
import { Prize } from '../models/prize/prize';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { Router } from '@angular/router';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';

@Component({
  selector: 'app-prizes-page',
  templateUrl: './prizes-page.page.html',
  styleUrls: ['./prizes-page.page.scss'],
})
export class PrizesPagePage implements OnInit {
  prizes: Prize[];
  user: User;
  team: Team;
  userjoin:UserJoinsTeam;

  constructor(
    public alertCtrl: AlertController,
    private prizeService: PrizeService,
    private router: Router
    ) {
      this.prizes = new Array<Prize>;
      this.user = new User();
      this.team = new Team();
      this.userjoin = new UserJoinsTeam();
     }


  async showAlert(name: string, points: number) {
    const alert = await this.alertCtrl.create({
      message: `Riscuotere "${name}" per ${points} punti?`,
      buttons: [
        {
          text: 'No',
          role: 'no',
          cssClass:'alert-button-red'
        },
        {
          text: 'Si',
          cssClass:'alert-button-blue',
          handler: () => {
           this.userjoin.points -= points;
          }
        }
      ]
    });
    await alert.present();
  }


  ngOnInit() {
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userjoin =  JSON.parse(localStorage.getItem('viewUserJoinsTeam') || '{}');
    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    this.Listprize(this.team.codice);
   }

  Listprize(idTeam: Number){
    this.prizeService.listPrize(this.team.codice).subscribe(response =>{
      this.prizes = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }
}
