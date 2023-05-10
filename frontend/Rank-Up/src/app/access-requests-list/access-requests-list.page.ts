import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { AccessRequestService } from '../services/accessRequest/access-request.service';
import { AccessRequest } from '../models/accessRequest/access-request';

@Component({
  selector: 'app-access-requests-list',
  templateUrl: './access-requests-list.page.html',
  styleUrls: ['./access-requests-list.page.scss'],
})
export class AccessRequestsListPage implements OnInit {
  accessRequest: AccessRequest;

  constructor(
    private location: Location,
    private alertController: AlertController,
    private accessRequestService: AccessRequestService
    ) {
      this.accessRequest = new AccessRequest();
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
    this.accessRequestService.deleteRequest(this.accessRequest); 
  }
}
