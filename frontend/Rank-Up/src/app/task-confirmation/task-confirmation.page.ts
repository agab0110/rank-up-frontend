import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-task-confirmation',
  templateUrl: './task-confirmation.page.html',
  styleUrls: ['./task-confirmation.page.scss'],
})
export class TaskConfirmationPage implements OnInit {

  stato = false

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Richesta archiviata',
      buttons: [
        {
          text: 'Chiudi',
          cssClass: 'alert-button-red',
        },
      ],
    });

  await alert.present();
  }


  mostra() {
    this.stato = !this.stato;
  }
}
