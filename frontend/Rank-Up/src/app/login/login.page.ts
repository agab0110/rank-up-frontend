import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user/user';
import { SHA3 } from 'crypto-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  user: User;
  password!: string;
  errorCheck: boolean = false;
  showPassword: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private service: UserService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
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
    localStorage.setItem('admin', '');
    localStorage.setItem('userJoinsTeam', '');

    LocalNotifications.requestPermissions();
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
      this.user.username = '';
      this.password = ''; // Pulisci il valore del campo di input
      this.showPassword = false;
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

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); // Ignora il carattere spazio
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
