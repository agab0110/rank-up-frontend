import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  constructor(private alertController: AlertController,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
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
