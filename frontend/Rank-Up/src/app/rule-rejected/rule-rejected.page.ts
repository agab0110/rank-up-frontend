import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rule-rejected',
  templateUrl: './rule-rejected.page.html',
  styleUrls: ['./rule-rejected.page.scss'],
})
export class RuleRejectedPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }

}
