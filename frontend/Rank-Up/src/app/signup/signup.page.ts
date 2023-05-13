import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { UserService } from '../services/user/user.service';
import { MD5 } from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  user: User;
  password!: string;
  errorCheck: boolean = false;

  constructor(
    private router: Router,
    private service: UserService
    ) {
    this.user = new User();
  }

  signup() {
    const hashedPassword = MD5(this.password).toString();

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

}
