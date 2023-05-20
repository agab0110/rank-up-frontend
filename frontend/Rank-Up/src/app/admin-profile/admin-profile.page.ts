import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { Team } from '../models/team/team';
import { UserGetPrizeService } from '../services/userGetPrize/user-get-prize.service';
import { Prize } from '../models/prize/prize';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {

  stato = false

  userProfile: User;
  user: User;
  team: Team;
  //admin: 
  prizes: Prize[];


  constructor(
    private location: Location,
    private router: Router,
    private userGetPrizeService: UserGetPrizeService,
    ) {
      this.userProfile = new User();
      this.user = new User();
      this.team = new Team();
      this.prizes = [];
     }

  ngOnInit() {
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      //this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      //this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.userGetPrizeService.getUserPrizes(/*this.userProfile.id*/1, /*this.team.codice*/1).subscribe(
      (response: any) => {
        this.prizes = response;
        console.log(this.prizes);
      }, (error: Response) => {  
        if(error.status == 400) {
          console.log("400 error");
        }
        else {  
          console.log('An unexpected error occured');   
        }
        console.log(error);
      });
  }

  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.stato = !this.stato;
  }
}
