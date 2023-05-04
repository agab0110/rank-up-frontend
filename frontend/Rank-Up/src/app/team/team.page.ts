import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  constructor(private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Abbandonare il team?',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-red',
        },
        {
          text: 'Si',
          cssClass: 'alert-button-blue',
          handler: () => {
            this.router.navigate(["user/home"])
          }
        },
      ],
    });

    await alert.present();
  }
}
