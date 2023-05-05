import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  user: User;

  constructor(
    private router: Router,
    private service: UserService
    ) {
    this.user = new User();
  }

  signup() {
    this.service.save(this.user).subscribe(result => this.router.navigate(['/login']));
  }

}
