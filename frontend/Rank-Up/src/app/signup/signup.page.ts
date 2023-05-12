import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { UserService } from '../services/user/user.service';
import { AES } from 'crypto-js';
//import { bcrypt } from 'bcryptjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  user: User;
  errorCheck: boolean = false;

  constructor(
    private router: Router,
    private service: UserService
    ) {
    this.user = new User();
  }

  signup() {
    const secretKey = 'Key123';
    const encryptedPassword = AES.encrypt(this.user.password, secretKey).toString();
    
    this.user.password = encryptedPassword;

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

}
