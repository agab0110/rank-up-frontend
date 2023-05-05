import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {

  constructor(private alertController: AlertController, private location: Location) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Inserire Nome Utente:',
      inputs: [
        {
          placeholder: 'Nome Utente',
          cssClass: 'alert-input',
        },
      ],
      buttons: [
        {
          text: 'Aggiungi',
          cssClass: 'alert-button-blue',
        },
        {
          text: 'Annulla',
          cssClass: 'alert-button-red',
        },
      ],
    });

  await alert.present();
  }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }

}
