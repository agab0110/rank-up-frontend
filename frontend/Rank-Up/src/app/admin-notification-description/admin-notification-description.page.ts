import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-notification-description',
  templateUrl: './admin-notification-description.page.html',
  styleUrls: ['./admin-notification-description.page.scss'],
})
export class AdminNotificationDescriptionPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  backButton() {
    this.location.back();
  }

}
