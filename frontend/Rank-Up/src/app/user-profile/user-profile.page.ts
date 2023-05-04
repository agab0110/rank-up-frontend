import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  public descrBtns = ["Chiudi"];
  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL: string | undefined | null;


  constructor(private alertController: AlertController) { }
  
  user_username: string = 'Username'
  user_name: string = '[Nome'
  user_surname: string = 'Cognome]'
  user_email: string = 'Email'

  ngOnInit() {

  }

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

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Imposta Privacy Team:',
      inputs: [
        {
          placeholder: 'Nome',
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

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Imposta Privacy Team:',
      inputs: [
        {
          placeholder: 'Username',
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

  async presentAlert4() {
    const alert = await this.alertController.create({
      header: 'Imposta Privacy Team:',
      inputs: [
        {
          placeholder: 'Email',
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

  async presentAlert5() {
    const alert = await this.alertController.create({
      header: 'Imposta Privacy Team:',
      inputs: [
        {
          placeholder: 'Password',
          type: 'password',
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

}
