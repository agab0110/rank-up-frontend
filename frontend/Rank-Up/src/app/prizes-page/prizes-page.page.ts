import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { PrizeService } from '../services/prize/prize.service';
import { Prize } from '../models/prize/prize';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';

@Component({
  selector: 'app-prizes-page',
  templateUrl: './prizes-page.page.html',
  styleUrls: ['./prizes-page.page.scss'],
})
export class PrizesPagePage implements OnInit {
  prizes: Prize[];
  user: User;
  team: Team;

  constructor(
    public alertCtrl: AlertController,
    private prizeService: PrizeService
    ) {
      this.prizes = new Array<Prize>
      this.user = new User
      this.team = new Team
     }

  user_name: string = '[Nome Utente]';
  user_points: number = 500


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
           this.user_points -= points;
          }
        }
      ]
    });
    await alert.present();
  }


  ngOnInit() {
    if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
      //if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
    //this.router.navigate(['user/home']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.Listprize(this.team.codice);
   }

  Listprize(idTeam: Number){
    this.prizeService.listPrize(1).subscribe(response =>{
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
