import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {

  constructor(private router: Router) { }
  stato = false

  ngOnInit() {
  }
  segmentChanged(event: any) {
    this.stato = !this.stato;
  }
}
