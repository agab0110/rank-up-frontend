import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TeamService } from '../services/team/team.service';

@Component({
  selector: 'app-admin-team-settings',
  templateUrl: './admin-team-settings.page.html',
  styleUrls: ['./admin-team-settings.page.scss'],
})
export class AdminTeamSettingsPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL: string | undefined | null;

  constructor(
    private alertController: AlertController,
    private location: Location,
    private router: Router,
    private teamService: TeamService;
  ) { }

  choice_privacy_utente: Boolean = true;
  choice_privacy_team: Boolean = true;


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
          handler: () => {
            //this.teamService.changeTeamName(this.teamId, this.teamName);
          }
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
          cssClass: this.choice_privacy_team ? 'alert-button-red' : 'alert-button-blue',
          handler: () => {
            this.choice_privacy_team = true;
          }
        },
        {
          text: 'Privato',
          cssClass: this.choice_privacy_team ? 'alert-button-blue' : 'alert-button-red',
          handler: () => {
            this.choice_privacy_team = false;
          }
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
          cssClass: this.choice_privacy_utente ? 'alert-button-red' : 'alert-button-blue',
          handler: () => {
            this.choice_privacy_utente = true;
          }
        },
        {
          text: 'No',
          cssClass: this.choice_privacy_utente ? 'alert-button-blue' : 'alert-button-red',
          handler: () => {
            this.choice_privacy_utente = false;
          }
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
          handler: () => {
            //this.teamService.deleteTeam(this.teamId);
            this.router.navigate(['/user/home']);
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

  backButton() {
    this.location.back();
  }

}
