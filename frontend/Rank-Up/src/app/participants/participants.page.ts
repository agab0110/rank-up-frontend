import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {

  constructor(private router: Router, private location: Location) { }
  stato = false

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }

  segmentChanged(event: any) {
    this.stato = !this.stato;
  }
}
