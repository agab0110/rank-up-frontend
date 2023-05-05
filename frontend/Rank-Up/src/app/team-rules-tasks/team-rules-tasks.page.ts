import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-rules-tasks',
  templateUrl: './team-rules-tasks.page.html',
  styleUrls: ['./team-rules-tasks.page.scss'],
})
export class TeamRulesTasksPage implements OnInit {

  public alertBtns = ["Accetta", "Rifiuta"];
  type='rules';
  stato= false;

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    this.stato = !this.stato;
  }

}
