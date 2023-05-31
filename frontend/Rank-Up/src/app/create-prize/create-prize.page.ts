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

  public createPrize(){
    this.prize.beloggingTeam = this.team;    
    this.prize.admin = this.admin;           
    this.prizeService.newPrize(this.prize,this.prize.name).subscribe(response => {
      console.log("Premio creato con successo");
      console.log(response);
    }, async (error: Response) => {
      console.log(error);
      const alert = await this.alertController.create({
        header: "Nome già in uso",
        message: "Inserire un altro nome",
        buttons: ['Chiudi']
      });
      await alert.present();
    });
  }
}
