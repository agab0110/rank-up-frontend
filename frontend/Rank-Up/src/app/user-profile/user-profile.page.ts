import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Team } from '../models/team/team';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { SHA3 } from 'crypto-js';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user: User;

  public user_name: string | undefined
  public user_surname: string | undefined
  public user_username: string | undefined
  public user_email: string | undefined
  public user_photo: string | undefined
  team: Team;
  password: any;
  showPassword: boolean = false;
  
  photo: any;

  lenPassword = 6;
  lenUsername = 2;

  log_error_password: string = '';
  log_error_username: string = '';
  emailErrorMessage: string = '';



  public descrBtns = ["Chiudi"];
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private userService: UserService,
    private fileService: FileService,
  ) {
    this.team = new Team();
    this.user = new User();
  }

  ngOnInit() {
    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.userService.getUser(this.user.id).subscribe(data => {
      console.log(data)
      this.user_name = JSON.parse(JSON.stringify(data)).name;
      this.user_surname = JSON.parse(JSON.stringify(data)).surname;
      this.user_username = JSON.parse(JSON.stringify(data)).username;
      this.user_email = JSON.parse(JSON.stringify(data)).email;
      this.user_photo = JSON.parse(JSON.stringify(data)).photo;
    });

  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.user = new User();
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  async emptyAlert() {
    const alert = await this.alertController.create({
      header: 'Modifica non effettuata',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-blue',
        },
      ],
    });

    await alert.present();
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
              this.userService.getUser(this.user.id).subscribe(data => {
                console.log(data)
                this.user_name = JSON.parse(JSON.stringify(data)).name;
                this.user_surname = JSON.parse(JSON.stringify(data)).surname;
                this.user_username = JSON.parse(JSON.stringify(data)).username;
                this.user_email = JSON.parse(JSON.stringify(data)).email;
                this.user_photo = JSON.parse(JSON.stringify(data)).photo;
                this.confirmationAlert();
              });
            }, (error: Response) => {
              if (error.status == 400) {
                console.log("400 error");
                this.emptyAlert();
              }
              else {
                console.log('An unexpected error occured');
                this.emptyAlert();
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
        this.userService.changePhoto(this.user.id, photo).subscribe(response => {
          localStorage.setItem('user', JSON.stringify(response));
          window.location.reload();
        });
      });
    });
    this.modal.dismiss();
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
            this.user.username = alertData[0];
            const isUsernameValid = this.username_checker();

            if (!isUsernameValid) {
              this.presentAlert8();
            }

            if (isUsernameValid) {
              this.userService.changeUsername(this.user.id, alertData[0]).subscribe(response => {
                this.user = response;
                localStorage.setItem('user', JSON.stringify(this.user));
                console.log(this.user);
                this.userService.getUser(this.user.id).subscribe(data => {
                  console.log(data)
                  this.user_name = JSON.parse(JSON.stringify(data)).name;
                  this.user_surname = JSON.parse(JSON.stringify(data)).surname;
                  this.user_username = JSON.parse(JSON.stringify(data)).username;
                  this.user_email = JSON.parse(JSON.stringify(data)).email;
                  this.user_photo = JSON.parse(JSON.stringify(data)).photo;

                  this.confirmationAlert();
                });
              }, (error: Response) => {
                if (error.status == 400) {
                  console.log("400 error");
                  this.emptyAlert();
                }
                else {
                  console.log('An unexpected error occured');
                  this.emptyAlert();
                }
                console.log(error);
              });
            }
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
          handler: (alertData) => {
            console.log(alertData[0]);
            this.user.email = alertData[0];
            const isEmailValid = this.emailChecker();

            if (!isEmailValid) {
              this.presentAlert7();
            }
            if (isEmailValid) {
              this.userService.changeEmail(this.user.id, alertData[0]).subscribe(response => {
                this.user = response;
                localStorage.setItem('user', JSON.stringify(this.user));
                console.log(this.user);
                this.userService.getUser(this.user.id).subscribe(data => {
                  console.log(data)
                  this.user_name = JSON.parse(JSON.stringify(data)).name;
                  this.user_surname = JSON.parse(JSON.stringify(data)).surname;
                  this.user_username = JSON.parse(JSON.stringify(data)).username;
                  this.user_email = JSON.parse(JSON.stringify(data)).email;
                  this.user_photo = JSON.parse(JSON.stringify(data)).photo;

                  this.confirmationAlert();
                });
              }, (error: Response) => {
                if (error.status == 400) {
                  console.log("400 error");
                  this.emptyAlert();
                }
                else {
                  console.log('An unexpected error occured');
                  this.emptyAlert();
                }
                console.log(error);
              });
            }
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

  async presentAlert5() {
    this.showPassword = false;

    const alert = await this.alertController.create({
      header: 'Inserisci nuova password:',
      inputs: [
        {
          placeholder: 'Password',
          type: this.showPassword ? 'text' : 'password',
          cssClass: 'alert-input',
        },
      ],
      buttons: [
        {
          text: "Visibilità Password",
          cssClass: 'alert-button-blue',
          handler: () => {
            this.showPassword = !this.showPassword;
            const input = document.querySelector('ion-alert input');
            if (input) {
              input.setAttribute('type', this.showPassword ? 'text' : 'password');
            }
            return false;
          },
        },
        {
          text: 'Conferma',
          cssClass: 'alert-button-blue',
          handler: (alertData) => {
            if (!alertData[0]) {
              this.emptyAlert();
            } else {
              console.log("Ok");
              const hashedPassword = SHA3(alertData[0]).toString();
              this.password = alertData[0];
              const isPasswordValid = this.password_checker();

              if (!isPasswordValid) {
                this.presentAlert6();
              }
              if (isPasswordValid) {
                this.userService.changePassword(this.user.id, hashedPassword).subscribe(response => {
                  this.user = response;
                  localStorage.setItem('user', JSON.stringify(this.user));
                  console.log(this.user);
                  this.userService.getUser(this.user.id).subscribe(data => {
                    console.log(data)
                    this.user_name = JSON.parse(JSON.stringify(data)).name;
                    this.user_surname = JSON.parse(JSON.stringify(data)).surname;
                    this.user_username = JSON.parse(JSON.stringify(data)).username;
                    this.user_email = JSON.parse(JSON.stringify(data)).email;
                    this.user_photo = JSON.parse(JSON.stringify(data)).photo;

                    this.confirmationAlert();
                  });
                }, (error: Response) => {
                  if (error.status == 400) {
                    console.log("400 error");
                    this.emptyAlert();
                  }
                  else {
                    console.log('An unexpected error occured');
                    this.emptyAlert();
                  }
                  console.log(error);
                });
              }
            }
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

  async confirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Modifica effetuata con successo!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }

  async presentAlert6() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: this.log_error_password,
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }

  async presentAlert7() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: this.emailErrorMessage,
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }

  async presentAlert8() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: this.log_error_username,
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }

  password_checker() {
    const passwordControl = this.password;
    let isPasswordValid = true;

    if (passwordControl && passwordControl.trim() !== '') {
      const uppercasePattern = /^(?=.*?[A-Z])/;
      const lowercasePattern = /^(?=.*?[a-z])/;
      const specialCharacterPattern = /^(?=.*?[#?!@$%^&*-])/;
      const numberPattern = /^(?=.*?[0-9])/;
      const lengthPattern = new RegExp(`^.{${this.lenPassword},}`);

      let errorMessages = [];

      if (!uppercasePattern.test(passwordControl)) {
        errorMessages.push('La password deve contenere almeno una lettera maiuscola');
        isPasswordValid = false;
      }
      if (!lowercasePattern.test(passwordControl)) {
        errorMessages.push('La password deve contenere almeno una lettera minuscola');
        isPasswordValid = false;
      }
      if (!specialCharacterPattern.test(passwordControl)) {
        errorMessages.push('La password deve contenere almeno un carattere speciale');
        isPasswordValid = false;
      }
      if (!numberPattern.test(passwordControl)) {
        errorMessages.push('La password deve contenere almeno un numero');
        isPasswordValid = false;
      }
      if (!lengthPattern.test(passwordControl)) {
        errorMessages.push(`La password deve essere lunga almeno ${this.lenPassword} caratteri`);
        isPasswordValid = false;
      }

      if (errorMessages.length > 0) {
        this.log_error_password = errorMessages.join(' , ');
        const div = document.getElementById('password');
        if (div != null) div.style.color = 'var(--ion-color-admin)';
        return false;
      } else {
        this.log_error_password = '';
        const div = document.getElementById('password');
        if (div != null) div.style.color = 'var(--ion-color-user)';
        return true;
      }
    } else {
      this.log_error_password = 'La password non puo\' essere vuota';
      const div = document.getElementById('password');
      if (div != null) div.style.color = 'gray';
      isPasswordValid = false;
    }
    return isPasswordValid;
  }

  emailChecker() {
    const emailControl = this.user.email;
    let isEmailValid = true;

    if (emailControl && emailControl.trim() !== '') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|virgilio\.it)$/i;
      if (!emailPattern.test(emailControl)) {
        this.emailErrorMessage = 'Formato email non valido.';
        isEmailValid = false;
        return false;
      } else {
        this.emailErrorMessage = '';
        return true;
      }
    } else {
      this.emailErrorMessage = 'Email mancante.';
      isEmailValid = false;
      return false;
    }
  }

  username_checker() {
    const usernameControl = this.user.username;
    let isUsernameValid = true;

    if (usernameControl && usernameControl.trim() !== '') {
      const lengthPattern = new RegExp(`^.{${this.lenUsername},}`);
      if (!lengthPattern.test(usernameControl)) {
        this.log_error_username = `L'username deve essere lungo almeno ${this.lenUsername} caratteri`;
        isUsernameValid = false;
        return false
      } else {
        this.log_error_username = '';
        return true;
      }
    } else {
      this.log_error_username = 'Il campo username non puo\' essere vuoto';
      isUsernameValid = false;
      return false;
    }
  }

  async presentAlert9() {
    const alert = await this.alertController.create({
      header: 'Attenzione',
      message: 'Funzionalità non ancora implementata',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-red',
        },
      ],
    });

    await alert.present();
  }
}
