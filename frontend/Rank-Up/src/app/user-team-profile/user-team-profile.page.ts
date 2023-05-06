import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-team-profile',
  templateUrl: './user-team-profile.page.html',
  styleUrls: ['./user-team-profile.page.scss'],
})
export class UserTeamProfilePage implements OnInit {
  stato = true; 

  constructor(private location: Location) { }

  ngOnInit() {
  }

  segmentChanged(event:any) {
    this.stato = !this.stato
  }

  backButton() {
    this.location.back();
  }
}
