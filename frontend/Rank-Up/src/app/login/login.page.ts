import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: User;

  constructor(
    private router: Router,
    private service: UserService
    ) {
      this.user = new User();
    }

  login() {
    this.service.login(this.user).subscribe(response => this.router.navigate(['user/home']));
  }

}
