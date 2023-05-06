import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  styleUrls: ['./admin-list.page.scss'],
})
export class AdminListPage implements OnInit {

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
