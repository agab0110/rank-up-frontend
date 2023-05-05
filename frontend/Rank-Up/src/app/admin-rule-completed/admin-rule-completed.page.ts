import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-rule-completed',
  templateUrl: './admin-rule-completed.page.html',
  styleUrls: ['./admin-rule-completed.page.scss'],
})
export class AdminRuleCompletedPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }

}
