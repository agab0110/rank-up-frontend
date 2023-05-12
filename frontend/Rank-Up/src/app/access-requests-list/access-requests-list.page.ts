import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';

@Component({
  selector: 'app-access-requests-list',
  templateUrl: './access-requests-list.page.html',
  styleUrls: ['./access-requests-list.page.scss'],
})
export class AccessRequestsListPage implements OnInit {
  userJoinsTeam: UserJoinsTeam;

  constructor(
    private location: Location,
    private alertController: AlertController,
    private userJoinsTeamService: UserJoinsTeamService
    ) {
      this.userJoinsTeam = new UserJoinsTeam();
    }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Accettare l'utente [Nome Utente] nel Team [Nome Team]?",
      buttons: [
        {
          text: 'Accetta',
          cssClass: 'alert-button-blue',
        },
        {
          text: 'Rifiuta',
          cssClass: 'alert-button-red',
          handler: () => {
            this.deleteRequest();
          }
        },
      ],
    });

  await alert.present();
  }

  deleteRequest(){
    this.userJoinsTeamService.deleteRequest(this.userJoinsTeam); 
  }
}
