import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.page.html',
  styleUrls: ['./admin-list.page.scss'],
})
export class AdminListPage implements OnInit {

  stato = false

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    this.stato = !this.stato;
  }
}
