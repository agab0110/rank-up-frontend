import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Location } from '@angular/common';
import { Team } from '../models/team/team';
import { TeamService } from '../services/team/team.service';
import { Router } from '@angular/router';
import { User } from '../models/user/user';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  public user: User;
  public codiceTeam: any;
  public nomeTeam: string = ""

  public descrBtns = ["Chiudi"];
  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL: string | undefined | null;

  constructor(
    private alertController: AlertController,
    private location: Location,
    private teamService: TeamService,
    private router: Router
  ) { 
    this.user = new User();
  }

  privacyTeam: boolean = true;

  ngOnInit() {
    localStorage.setItem('teamId', '');
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const team = new Team();
    team.name = "temp"
    team.privacy = this.privacyTeam
    team.photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F410-4108064_transparent-groups-of-people-clipart-team-icon-png.png&f=1&nofb=1&ipt=7e6d77faf7d2d967292fd2c9900358d6078b1dad3e041cc7d26632084638e101&ipo=images"
    this.teamService.newTeam(team).subscribe(data => {
      this.codiceTeam = JSON.parse(JSON.stringify(data)).codice
    })
  }

  backButton() {
    this.location.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Imposta Privacy Team:',
      buttons: [
        {
          text: 'Pubblico',
          cssClass: this.privacyTeam ? 'alert-button-red' : 'alert-button-blue',
          handler: () => {
            this.privacyTeam = true;
          }
        },
        {
          text: 'Privato',
          cssClass: this.privacyTeam ? 'alert-button-blue' : 'alert-button-red',
          handler: () => {
            this.privacyTeam = false;
          }

        },
      ],
    });

    await alert.present();
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

  navigate() {
    if (this.nomeTeam != "") {
      this.teamService.changeTeamName(this.codiceTeam, this.nomeTeam).subscribe(data => {
        this.router.navigate(['/admin/admin-home-team'])
      })
    }
  }
}
