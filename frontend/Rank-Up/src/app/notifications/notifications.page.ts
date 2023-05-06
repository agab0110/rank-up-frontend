import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public alertBtns = ["Accetta", "Rifiuta"];
  type='utente';

  constructor(private location: Location) { }

  ngOnInit() {
  }

  segmentChanged(ev: any){
    console.log('Type changed ', ev)
  }
  
  backButton() {
    this.location.back();
  }
}
