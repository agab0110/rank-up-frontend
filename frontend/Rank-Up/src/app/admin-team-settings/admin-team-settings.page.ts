import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-admin-team-settings',
  templateUrl: './admin-team-settings.page.html',
  styleUrls: ['./admin-team-settings.page.scss'],
})
export class AdminTeamSettingsPage implements OnInit {

  team_name : string = "[Nome Team]";
  team_code : string = "[Codice Team]";

  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL: string | undefined | null;

  constructor(private alertController: AlertController) { }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Modifica Nome Team:',
      inputs: [
        {
          placeholder: 'Nuovo Nome',
          cssClass: 'alert-input',
        },
      ],
      buttons: [
        {
          text: 'Conferma',
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
  
  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'Imposta Privacy Team:',
      buttons: [
        {
          text: 'Pubblico',
          cssClass: 'alert-button-blue',
        },
        {
          text: 'Privato',
          cssClass: 'alert-button-red',
        },
      ],
    });

  await alert.present();
  }

  async presentAlert4() {
    const alert = await this.alertController.create({
      header: 'Mostrare Punteggi Partecipanti?',
      buttons: [
        {
          text: 'Sì',
          cssClass: 'alert-button-blue',
        },
        {
          text: 'No',
          cssClass: 'alert-button-red',
        },
      ],
    });

  await alert.present();
  }

  async presentAlert5() {
    const alert = await this.alertController.create({
      header: 'Eliminare il Team?',
      buttons: [
        {
          text: 'Sì',
          cssClass: 'alert-button-blue',
        },
        {
          text: 'No',
          cssClass: 'alert-button-red',
        },
      ],
    });

  await alert.present();
  }

  ngOnInit() {}

  loadFileFromDevice(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      this.blobURL = URL.createObjectURL(this.blob);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  closeModal() {
    this.blob = null;
    this.blobURL = null;
    this.modal.dismiss();
  }

  attach() {
    this.modal.dismiss();
  }

}
