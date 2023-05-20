import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { UserService } from '../services/user/user.service';
import { SHA3 } from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  user: User;
  password!: string;
  errorCheck: boolean = false;

  log_error_username = 'Inserisci un username valido';
  log_error_password: string = 'Inserisci una password valida';

  lenUsername = 8;
  lenPassword = 8;

  ion_touched = true;
  ion_invalid = true;


  constructor(
    private router: Router,
    private service: UserService
    ) {
    this.user = new User();
  }

  signup() {
    const hashedPassword = SHA3(this.password).toString();

    this.user.password = hashedPassword;

    this.errorCheck = false;
    this.service.save(this.user).subscribe(result => 
      {
        console.log(this.user.password);
        this.router.navigate(['/login']);
      }, (error: Response) => {  
        this.errorCheck = true;
        if(error.status == 400)  
          console.log("400 error");  
        else {  
          console.log('An unexpected error occured');   
        }
        console.log(error);
      });
  }
  username_checker() {
    const div = document.getElementById('username');
    if (this.user.username !== '' && this.user.username !== undefined && this.user.username !== null) {

      if (this.user.username.length < this.lenUsername && this.user.username !== '') {
        this.log_error_username = 'L\'username deve contenere almeno ' + this.lenUsername + ' caratteri';
      } else {
          const a = new RegExp("^[a-zA-Z0-9._-]+$");
          if (!a.exec(this.user.username)) {
            this.log_error_username = 'I caratteri speciali consentiti sono . _ -'
          } else {
            this.log_error_username = 'Username valido'
            if (div != null) div.style.color = 'var(--ion-color-user)';
            return true;
          }
        }
    } else {
      this.log_error_username = 'Inserisci un username valido';
      if (div != null) div.style.color = 'gray';
      return false;
    }
    if (div != null) div.style.color = 'var(--ion-color-admin)';
    return false;
  }



  password_checker() {
    const div = document.getElementById('password');
    if (this.user.password !== '' && this.user.password !== undefined && this.user.password !== null) {
      let a = new RegExp("^(?=.*?[A-Z])");
      if (!a.exec(this.user.password)) this.log_error_password = 'La password deve contenere almeno una lettera maiuscola';
      else {
        a = new RegExp("^(?=.*?[a-z])");
        if(!a.exec(this.user.password)) this.log_error_password = 'La password deve contenere almeno una lettera minuscola';
        else {
          a = new RegExp("^(?=.*?[#?!@$%^&*-])");
          if(!a.exec(this.user.password)) this.log_error_password = 'La password deve contenere almeno un carattere speciale';
          else {
            a = new RegExp("^(?=.*?[0-9])");
            if(!a.exec(this.user.password)) this.log_error_password = 'La password deve contenere almeno un numero';
          else {
              a = new RegExp("^.{" + this.lenPassword + ",}");
              if(!a.exec(this.user.password)) this.log_error_password = 'La password deve essere lunga almeno ' + this.lenPassword + ' caratteri';
              else {
                this.log_error_password = 'Password valida';
                if (div != null) div.style.color = 'var(--ion-color-user)';
                return true;
              }
            }
          }
        }
      }
    } else {
      this.log_error_password = 'Inserisci una password valida';
      if (div != null) div.style.color = "gray";
      return false
    }
    if (div != null) div.style.color = 'var(--ion-color-admin)';
    return false;
  }


}
