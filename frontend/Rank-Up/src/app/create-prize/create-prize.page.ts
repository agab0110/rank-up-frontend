import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Prize } from '../models/prize/prize';
import { PrizeService } from '../services/prize/prize.service';
import { Team } from '../models/team/team';
import { Router } from '@angular/router';
import { Admin } from '../models/admin/admin';
import { TeamService } from '../services/team/team.service';
import { User } from '../models/user/user';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-prize',
  templateUrl: './create-prize.page.html',
  styleUrls: ['./create-prize.page.scss'],
})
export class CreatePrizePage implements OnInit {
  prize : Prize;
  team: Team;
  admin: Admin;
  user:User;

  constructor(
    private location: Location,
    private prizeService: PrizeService,
    private router: Router,
    private teamService: TeamService,
    private alertController: AlertController
    ) {

    this.prize = new Prize();
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

  }

  backButton() {
    this.location.back();
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Premio creato con successo!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async rejectedAlert() {
    const alert = await this.alertController.create({
      header: 'Errore nella creazione del premio!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async emptyNameAlert() {
    const alert = await this.alertController.create({
      header: 'Nome del premio vuoto, premio non creato!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async emptyPointsAlert() {
    const alert = await this.alertController.create({
      header: 'Punti del premio mancanti, premio non creato!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  public createPrize(){
    if(!this.prize.name){
      this.emptyNameAlert();
    }
    if(!this.prize.price){
      this.emptyPointsAlert();
    }
    this.prize.beloggingTeam = this.team;    
    this.prize.admin = this.admin;           
    this.prizeService.newPrize(this.prize,this.prize.name).subscribe(response => {
      console.log("Premio creato con successo");
      console.log(response);
      this.confirmationAlert();
    }, async (error: Response) => {
      if(error.status == 400){
        console.log("400 error");
        this.rejectedAlert();
      }
      else {
        console.log('An unexpected error occured');
        this.rejectedAlert();
      }
    });
  }
}
