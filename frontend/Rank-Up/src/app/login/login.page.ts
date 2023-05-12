import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user/user';

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
    this.errorCheck = false;
    this.service.login(this.user).subscribe(response => {
      this.user = response;
      this.router.navigate(['user/home']);
      localStorage.setItem('user', JSON.stringify(this.user));
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
