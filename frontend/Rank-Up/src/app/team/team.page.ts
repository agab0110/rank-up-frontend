import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  user: User;
  team: Team;

  constructor(private alertController: AlertController,
    private router: Router,
    private userJoinsTeamService: UserJoinsTeamService,
    private location: Location) {
      this.user = new User();
      this.team = new Team();
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
  }

  backButton() {
    this.location.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Abbandonare il Team?',
      buttons: [
        {
          text: 'Sì',
          cssClass: 'alert-button-blue',
          handler: () => {
            this.userJoinsTeamService.leveTeam(this.team.codice,this.user.id).subscribe(data =>{
              console.log(data);
              this.confirmationAlert();
              this.router.navigate(["user/home"])
            });
            
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
  async confirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Utente uscito dal team con successo!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }
}
