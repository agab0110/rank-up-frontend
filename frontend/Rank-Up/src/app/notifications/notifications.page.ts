import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public alertBtns = ["Accetta", "Rifiuta"];
  type='utente';

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any){
    console.log('Type changed ', ev)
  }

}
