import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';

@Component({
  selector: 'app-admin-home-team',
  templateUrl: './admin-home-team.page.html',
  styleUrls: ['./admin-home-team.page.scss'],
})
export class AdminHomeTeamPage implements OnInit {
  user: User;
  team: Team;
  admin: Admin;

  constructor(private location: Location,
    private router: Router) {
    this.user = new User();
    this.team = new Team();
    this.admin = new Admin();
     }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }
    if (localStorage.getItem('admin') == null) {
      this.router.navigate(["/user/home"]);
    }
  }

  backButton() {
    this.location.back();
  }

}
