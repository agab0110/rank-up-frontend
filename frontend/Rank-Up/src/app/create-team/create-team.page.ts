import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Location } from '@angular/common';
import { Team } from '../models/team/team';
import { TeamService } from '../services/team/team.service';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { AdminService } from '../services/admin/admin.service';
import { Admin } from '../models/admin/admin';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  public user: User;
  public codiceTeam: any;
  public nomeTeam: string = ""
  public admin: Admin;
  public team: Team;
  public descrBtns = ["Chiudi"];
  @ViewChild(IonModal) modal!: IonModal;
  photo: any;
  teamNameError: string = '';

  constructor(
    private alertController: AlertController,
    private location: Location,
    private teamService: TeamService,
    private router: Router,
    private adminService: AdminService,
    private fileService: FileService
  ) {
    this.user = new User();
    this.admin = new Admin();
    this.team = new Team();
  }

  privacyTeam: boolean = true;

  ngOnInit() {
    this.team = new Team();
    this.team.name = "nuovo Team"
    this.team.privacy = this.privacyTeam
    this.team.pointVisibility = true
    this.team.photo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F410-4108064_transparent-groups-of-people-clipart-team-icon-png.png&f=1&nofb=1&ipt=7e6d77faf7d2d967292fd2c9900358d6078b1dad3e041cc7d26632084638e101&ipo=images"

    //this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    //this.admin = JSON.parse(localStorage.getItem('admin') || '{}');

    this.teamService.newTeam(this.team).subscribe(response => {
      console.log(response)
      this.team = response;
      localStorage.setItem('team', JSON.stringify(response));
      console.log(this.team);
      this.codiceTeam = this.team.codice

      this.adminService.newAdmin(this.user.id, this.team.codice).subscribe(response => {
        console.log("Admin aggiunto con successo");
        console.log(response);
        this.adminService.getAdmin(this.team.codice, this.user.id).subscribe(response => {
          console.log(response);
          this.admin = response;
          localStorage.setItem('admin', JSON.stringify(this.admin));
        });
      }, (error: Response) => {
        if (error.status == 400)
          console.log("400 error");
        else {
          console.log('An unexpected error occured');
        }
        console.log(error);
        this.router.navigate(['/user/home']);
      });

    }, (error: Response) => {
      if (error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
      this.router.navigate(['/user/home']);
    });
  }

  backButton() {
    this.teamService.undo(this.team.codice).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)))
      this.router.navigate(['/user/home'])
    })
  }

  teamName() {
    const teamName = this.nomeTeam;

    if (teamName && teamName.trim() !== '') {
      const teamPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!teamPattern.test(teamName)) {
        this.teamNameError = '';
      } else {
        this.teamNameError = '';
      }
    } else {
      this.teamNameError = 'Il nome del Team è necessario.';
    }
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
        });
      });
    });
    this.modal.dismiss();
  }

  navigate() {
    if (this.nomeTeam != "") {
      this.teamService.changeTeamName(this.codiceTeam, this.nomeTeam).subscribe(() => {

        this.teamService.changePrivacyTeam(this.codiceTeam, this.privacyTeam).subscribe(data => {console.log(data)});
        this.router.navigate(['/user/home']);
        this.confirmationAlert();
      },(error: Response) => {
        console.log(error);
        if (error.status == 400){
          console.log("400 error");
          this.duplicateNameAlert();
        }
        else {
          console.log('An unexpected error occured');
          this.rejectedAlert();
        }
      });
    }else{
      this.rejectedAlert();
    }
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Team creato con successo!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }
  async duplicateNameAlert() {
    const alert = await this.alertController.create({
      header: 'Team non creato!Nome già presente',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async rejectedAlert() {
    const alert = await this.alertController.create({
      header: 'Nome del Team vuoto, Team non creato!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }
}