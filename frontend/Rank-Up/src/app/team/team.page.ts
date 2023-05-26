import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';

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
    private location: Location) {
      this.user = new User();
      this.team = new Team();
     }

  ngOnInit() {
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
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
            this.router.navigate(["user/home"])
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
}
