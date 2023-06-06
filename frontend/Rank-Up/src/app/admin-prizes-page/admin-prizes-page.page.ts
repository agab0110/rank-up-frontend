import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Prize } from '../models/prize/prize';
import { PrizeService } from '../services/prize/prize.service';
import { Team } from '../models/team/team';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-admin-prizes-page',
  templateUrl: './admin-prizes-page.page.html',
  styleUrls: ['./admin-prizes-page.page.scss'],
})
export class AdminPrizesPagePage implements OnInit {

  prizes:Prize[];
  team:Team;
  prize:Prize;
  user: User;

  constructor(
    private location: Location,
    private pizeservice : PrizeService,
    private router: Router,
    private alertController: AlertController) 
    
  {
    this.prizes = new Array<Prize>;
    this.team = new Team();
    this.prize = new Prize();
    this.user = new User();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }
    this.listPrize();

  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.prizes = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  backButton() {
    this.location.back();
  }
  listPrize(){
    this.pizeservice.listPrize(this.team.codice).subscribe(response =>{
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

  removePrize(idPrize: number) {
    this.pizeservice.removePrize(this.team.codice, idPrize).subscribe(
      (response) => {
        this.removedPrizeAlert();
        console.log('Premio rimosso dal team con successo');
        this.handleRefresh("");
      }
    );
  }

  async confirmRemovePrize(idPrice: number) {
    const alert = await this.alertController.create({
      header: 'Sicuro di cancellare il premio?',
      buttons: [
        {
          text: 'Conferma',
          cssClass: 'alert-button-blue',
          handler: () => {
            this.removePrize(idPrice);
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

  async removedPrizeAlert() {
    const alert = await this.alertController.create({
      header: 'Premio rimosso con successo!',
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
