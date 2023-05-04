import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.page.html',
  styleUrls: ['./request-history.page.scss'],
})
export class RequestHistoryPage implements OnInit {
  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Filtra per:',
      buttons: [
        {
          text: 'Nome Utente',
          cssClass: 'alert-button-red',
        },
        {
          text: 'Data di consegna',
          cssClass: 'alert-button-red',
        },
        {
          text: 'Nome attività',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }  

  ngOnInit() {
  }  
}
