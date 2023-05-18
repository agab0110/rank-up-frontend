import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { error } from 'console';
import { Team } from '../models/team/team';
import { User } from '../models/user/user';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  public descrBtns = ["Chiudi"];
  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL!: undefined | null | string;
  user: User;


  constructor(private alertController: AlertController, private userService: UserService) { 
    this.team = new Team();
    this.user = new User();
  }

  userId: number = 1;
  user_username: string = 'Username';
  user_name: string = '[Nome]';
  user_surname: string = 'Cognome]';
  user_email: string = 'Email';
  user_foto: string = 'Foto';
  team: Team;

  ngOnInit() {
    if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    //if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
    //this.router.navigate(['user/home']);
    //this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Inserisci nuovo nome:',
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
          handler: (alertData) => {
            console.log(alertData[0]);
            this.userService.changeName(this.user.id, alertData[0]).subscribe(response => {
              this.user = response;
              localStorage.setItem('user', JSON.stringify(this.user));
              console.log(this.user);
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

  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Inserisci nuovo username:',
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
          handler: (alertData) => {
            console.log(alertData[0]);
            this.userService.changeUsername(this.user.id, alertData[0]).subscribe(response => {
              this.user = response;
              localStorage.setItem('user', JSON.stringify(this.user));
              console.log(this.user);
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
      header: 'Inserisci nuova email:',
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
      header: 'Inserisci nuova password:',
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
