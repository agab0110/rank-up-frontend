import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-prize',
  templateUrl: './create-prize.page.html',
  styleUrls: ['./create-prize.page.scss'],
})
export class CreatePrizePage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }

}
