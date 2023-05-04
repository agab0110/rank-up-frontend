import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-rules-tasks',
  templateUrl: './team-rules-tasks.page.html',
  styleUrls: ['./team-rules-tasks.page.scss'],
})
export class TeamRulesTasksPage implements OnInit {

  public alertBtns = ["Accetta", "Rifiuta"];
  type='rules';

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any){
    console.log('Type changed', ev)
  }

}
