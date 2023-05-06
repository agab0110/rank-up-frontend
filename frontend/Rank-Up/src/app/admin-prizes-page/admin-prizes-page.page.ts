import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-prizes-page',
  templateUrl: './admin-prizes-page.page.html',
  styleUrls: ['./admin-prizes-page.page.scss'],
})
export class AdminPrizesPagePage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }
}
