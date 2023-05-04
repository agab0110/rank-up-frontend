import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.page.html',
  styleUrls: ['./search-team.page.scss'],
})
export class SearchTeamPage implements OnInit {

  constructor(private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vuoi unirti al team?',
      buttons: [
        {
          text: 'Si',
          cssClass: 'alert-button-blue',
          handler: () => {
            this.router.navigate(["user/team"])
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
