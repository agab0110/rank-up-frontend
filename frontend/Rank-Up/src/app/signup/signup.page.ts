import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { UserService } from '../services/user/user.service';
import { SHA3 } from 'crypto-js';
import { AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  user: User;
  password!: string;
  errorCheck: boolean = false;
  b:boolean = false;

  log_error_username: string = '';
  log_error_password: string = '';
  emailErrorMessage: string = '';

  lenUsername = 2;
  lenPassword = 6;
  passwordTouched: boolean = false;
  passwordValid: boolean = false;
  showPassword: boolean = false;

  
  //ion_touched = true;
  //ion_invalid = true;


  constructor(
    private location: Location,
    private router: Router,
    private service: UserService,
    private alertController: AlertController
    ) {
    this.user = new User();
  }

  signup() {
    const hashedPassword = SHA3(this.password).toString();

    this.user.password = hashedPassword;
    this.user.photo = "https://ionicframework.com/docs/img/demos/avatar.svg";
    

    this.errorCheck = false;
    this.service.save(this.user).subscribe(result => 
      {
        console.log(this.user.password);
        this.router.navigate(['/login']);
      }, (error: HttpErrorResponse) => {  
        this.errorCheck = true;
        if(error.status == 400){
          console.log("400 error");
          const responseBody = error.error;
          this.duplicateEmailAlert(responseBody);
        }
        else {  
          console.log('An unexpected error occured');   
        }
        console.log(error);
      });
  }

  username_checker() {
    const usernameControl = this.user.username;
  
    if (usernameControl && usernameControl.trim() !== '') {
      const lengthPattern = new RegExp(`^.{${this.lenUsername},}`);
  
      let errorMessages = [];
  
      if (!lengthPattern.test(usernameControl)) {
        errorMessages.push(`L'username deve essere lungo almeno ${this.lenUsername} caratteri`);
      }
  
      if (errorMessages.length > 0) {
        this.log_error_username = errorMessages.join('');
        const div = document.getElementById('username');
        if (div != null) div.style.color = 'var(--ion-color-admin)';
        return false;
      } else {
        this.log_error_username = '';
        const div = document.getElementById('username');
        if (div != null) div.style.color = 'var(--ion-color-user)';
        return true;
      }
    } else {
      this.log_error_username = 'Il campo username non puo\' essere vuoto';
      const div = document.getElementById('username');
      if (div != null) div.style.color = 'gray';
      return false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); // Ignora il carattere spazio
    }
  }

  password_checker() {
    const passwordControl = this.password;
  
    if (passwordControl && passwordControl.trim() !== '') {
      const uppercasePattern = /^(?=.*?[A-Z])/;
      const lowercasePattern = /^(?=.*?[a-z])/;
      const specialCharacterPattern = /^(?=.*?[#?!@$%^&*-])/;
      const numberPattern = /^(?=.*?[0-9])/;
      const lengthPattern = new RegExp(`^.{${this.lenPassword},}`);
  
      let errorMessages = [];
  
      if (!uppercasePattern.test(passwordControl)) {
        errorMessages.push('La password deve contenere almeno una lettera maiuscola');
      }
      if (!lowercasePattern.test(passwordControl)) {
        errorMessages.push('La password deve contenere almeno una lettera minuscola');
      }
      if (!specialCharacterPattern.test(passwordControl)) {
        errorMessages.push('La password deve contenere almeno un carattere speciale');
      }
      if (!numberPattern.test(passwordControl)) {
        errorMessages.push('La password deve contenere almeno un numero');
      }
      if (!lengthPattern.test(passwordControl)) {
        errorMessages.push(`La password deve essere lunga almeno ${this.lenPassword} caratteri`);
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
      return false;
    }
  }

  emailChecker() {
    const emailControl = this.user.email;

    if (emailControl && emailControl.trim() !== '') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|virgilio\.it|studenti\.unimol\.it|unimol\.it)$/i;
      if (!emailPattern.test(emailControl)) {
        this.emailErrorMessage = 'Formato email non valido.';
        this.b = false;
        return this.b;
      } else {
        this.emailErrorMessage = '';
        this.b = true;
        return this.b;
      }
    } else {
      this.emailErrorMessage = 'Email mancante.';
      this.b = false;
      return this.b;
    }
  }

  backButton() {
    this.location.back();
  }

  async duplicateEmailAlert(responseBody: string) {
    const alert = await this.alertController.create({
      header: 'Utente non registrato!',
      message: responseBody,
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
