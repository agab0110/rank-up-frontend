import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user/user';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {
  user: User;
  userJoin: UserJoinsTeam;
  stato = false

  constructor(private location: Location) {
    this.user = new User();
    this.userJoin = new UserJoinsTeam();
  }

  ngOnInit() {
    //if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      localStorage.getItem('viewUser');
      localStorage.getItem('viewUserJoinsTeam');
      this.user = JSON.parse(localStorage.getItem('viewUser') || '{}');
      this.userJoin = JSON.parse(localStorage.getItem('viewUserJoinsTeam') || '{}')
  }

  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.stato = !this.stato;
  }
}
