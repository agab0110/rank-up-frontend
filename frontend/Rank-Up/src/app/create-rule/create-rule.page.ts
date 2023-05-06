import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-rule',
  templateUrl: './create-rule.page.html',
  styleUrls: ['./create-rule.page.scss'],
})
export class CreateRulePage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }

}
