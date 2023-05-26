import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Location } from '@angular/common';
import { Team } from '../models/team/team';
import { TeamService } from '../services/team/team.service';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { AdminService } from '../services/admin/admin.service';
import { Admin } from '../models/admin/admin';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  public user: User;
  public team:Team;
  public codiceTeam: any;
  public nomeTeam: string = ""
  public admin:Admin;
  public descrBtns = ["Chiudi"];
  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL: string | undefined | null;

  constructor(
    private alertController: AlertController,
    private location: Location,
    private teamService: TeamService,
    private router: Router,
    private adminService: AdminService
  ) { 
    this.user = new User();
    this.team = new Team();
    this.admin = new Admin();
  }

  privacyTeam: boolean = true;

  ngOnInit() {
    //localStorage.setItem('adminId','');
    //localStorage.setItem('teamId', '');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    
    const team = new Team();
    team.name = "temp"
    team.privacy = this.privacyTeam
    team.photo = "https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
    this.teamService.newTeam(team).subscribe(data => {
      this.codiceTeam = JSON.parse(JSON.stringify(data)).codice
    });
    
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
  addAdmin() {
    
    this.adminService.newAdmin(this.user.id, this.team.codice).subscribe(response => {
      console.log("Admin aggiunto con successo");
      console.log(response);
    }, (error: Response) => {
      if( error.status == 400)
      console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }
}


