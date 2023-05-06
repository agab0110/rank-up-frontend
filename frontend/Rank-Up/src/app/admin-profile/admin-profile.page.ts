import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {

  stato = false

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.stato = !this.stato;
  }
}
