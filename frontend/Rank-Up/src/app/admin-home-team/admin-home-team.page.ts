import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';

@Component({
  selector: 'app-admin-home-team',
  templateUrl: './admin-home-team.page.html',
  styleUrls: ['./admin-home-team.page.scss'],
})
export class AdminHomeTeamPage implements OnInit {
  user: User;
  team: Team;

  constructor(private location: Location,
    private router: Router) {
    this.user = new User();
    this.team = new Team();
     }

  ngOnInit() {
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
  }

  backButton() {
    this.location.back();
  }

}
