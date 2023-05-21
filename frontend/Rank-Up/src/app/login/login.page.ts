import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user/user';
import { SHA3 } from 'crypto-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  user: User;
  password!: string;
  errorCheck: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private service: UserService,
    private formBuilder: FormBuilder
    ) {
      this.user = new User();
      this.loginForm = this.formBuilder.group({
        user: ['username', [Validators.required]],
        password: ['password', Validators.required],
      });
    }

    isFormValid(): boolean {
      return this.loginForm.valid;
    }

  ngOnInit() {
    localStorage.setItem('user', '');
    localStorage.setItem('team', '');
  }

  login() {
    const hashedPassword = SHA3(this.password).toString();

    this.user.password = hashedPassword;

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
