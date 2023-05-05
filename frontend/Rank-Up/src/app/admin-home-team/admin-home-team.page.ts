import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-home-team',
  templateUrl: './admin-home-team.page.html',
  styleUrls: ['./admin-home-team.page.scss'],
})
export class AdminHomeTeamPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }

}
