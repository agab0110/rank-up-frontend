import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-rule-completed',
  templateUrl: './user-rule-completed.page.html',
  styleUrls: ['./user-rule-completed.page.scss'],
})
export class UserRuleCompletedPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }
}
