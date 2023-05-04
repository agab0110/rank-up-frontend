import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-team-profile',
  templateUrl: './user-team-profile.page.html',
  styleUrls: ['./user-team-profile.page.scss'],
})
export class UserTeamProfilePage implements OnInit {
  stato = true 
  constructor() { }

  ngOnInit() {
  }
  segmentChanged(event:any) {
    this.stato = !this.stato
  }
}
