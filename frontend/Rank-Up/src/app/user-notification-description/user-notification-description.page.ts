import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-notification-description',
  templateUrl: './user-notification-description.page.html',
  styleUrls: ['./user-notification-description.page.scss'],
})
export class UserNotificationDescriptionPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  backButton() {
    this.location.back();
  }
}
