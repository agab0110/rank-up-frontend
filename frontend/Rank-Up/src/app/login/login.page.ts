import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user/user';
import { AES } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  user: User;
  errorCheck: boolean = false;

  constructor(
    private router: Router,
    private service: UserService
    ) { 
      this.user = new User();
    }

  ngOnInit() {
    localStorage.setItem('user', '');
    localStorage.setItem('team', '');
  }

  login() {
    const secretKey = 'Key123';
    const encryptedPassword = AES.encrypt(this.user.password, secretKey).toString();

    this.user.password = encryptedPassword;

    this.errorCheck = false;
    this.service.login(this.user).subscribe(response => {
      this.user = response;
      console.log(this.user.password)
      this.router.navigate(['user/home']);
      localStorage.setItem('user', JSON.stringify(this.user));
    }, (error: Response) => {  
      this.errorCheck = true;
      if(error.status == 400) {
        console.log("400 error");
        console.log(this.user.password);
      }
      else {  
        console.log('An unexpected error occured');   
      }
      console.log(error);
    });
  }

}
