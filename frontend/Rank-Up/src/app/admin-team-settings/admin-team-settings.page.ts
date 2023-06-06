import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TeamService } from '../services/team/team.service';
import { Team } from '../models/team/team';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-admin-team-settings',
  templateUrl: './admin-team-settings.page.html',
  styleUrls: ['./admin-team-settings.page.scss'],
})
export class AdminTeamSettingsPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  team: Team;
  choice_privacy_utente: boolean = true;
  choice_privacy_team: boolean = true;
  photo: any;

  constructor(
    private alertController: AlertController,
    private location: Location,
    private router: Router,
    private teamService: TeamService,
    private fileService: FileService
  ) {
    this.team = new Team();
   }

  ngOnInit() {
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
      this.router.navigate(['user/home']);

    this.choice_privacy_utente = this.team.privacy;
    this.choice_privacy_team = this.team.pointVisibility;
  }

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
          handler: (alertData) => {
            console.log(alertData[0]);
            this.teamService.changeTeamName(this.team.codice, alertData[0]).subscribe(response => {
              this.team = response;
              localStorage.setItem('team', JSON.stringify(this.team));
              console.log(this.team);
            }, (error: Response) => {
              if(error.status == 400)
                console.log("400 error");
              else {
                console.log('An unexpected error occured');
              }
              console.log(error);
            });
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
            this.teamService.changePrivacyTeam(this.team.codice, this.choice_privacy_team).subscribe(response => {
              this.team = response;
              localStorage.setItem('team', JSON.stringify(this.team));
              console.log(this.team);
            });
          }
        },
        {
          text: 'Privato',
          cssClass: this.choice_privacy_team ? 'alert-button-blue' : 'alert-button-red',
          handler: () => {
            this.choice_privacy_team = false;
            this.teamService.changePrivacyTeam(this.team.codice, this.choice_privacy_team).subscribe(response => {
              this.team = response;
              localStorage.setItem('team', JSON.stringify(this.team));
              console.log(this.team);
            });
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
            this.teamService.changePrivacyUser(this.team.codice, this.choice_privacy_utente).subscribe(response => {
              this.team = response;
              localStorage.setItem('team', JSON.stringify(this.team));
              console.log(this.team);
            });
          }
        },
        {
          text: 'No',
          cssClass: this.choice_privacy_utente ? 'alert-button-blue' : 'alert-button-red',
          handler: () => {
            this.choice_privacy_utente = false;
            this.teamService.changePrivacyUser(this.team.codice, this.choice_privacy_utente).subscribe(response => {
              this.team = response;
              localStorage.setItem('team', JSON.stringify(this.team));
              console.log(this.team);
            });
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
            this.teamService.deleteTeam(this.team.codice).subscribe(response => {
              console.log(response);
            });
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

  loadFileFromDevice(event: any) {
    event.target.files = null;
    this.photo = event.target.files[0];
  }

  closeModal() {
    this.photo = null;
    this.modal.dismiss();
  }

  attach() {
    this.fileService.uploadFile(this.photo).subscribe(response => {
      console.log(response);
      let id = JSON.parse(JSON.stringify(response)).id;
      console.log(id);
      this.fileService.getFile(id).subscribe(data => {
        let photo = JSON.parse(JSON.stringify(data)).url;
        this.teamService.changePhoto(this.team.codice, photo).subscribe(response => {
          localStorage.setItem('team', JSON.stringify(response));
          window.location.reload();
        });
      });
    });
    this.modal.dismiss();
  }

  backButton() {
    this.location.back();
  }

}
