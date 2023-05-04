import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {

  stato = false

  constructor() { }

  ngOnInit() {
  }

  showPermi(stato: boolean) {
    this.stato = stato;
  }
}
