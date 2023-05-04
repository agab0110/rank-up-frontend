import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-buttons',
  templateUrl: './confirm-buttons.component.html',
  styleUrls: ['./confirm-buttons.component.scss'],
})
export class ConfirmButtonsComponent  implements OnInit {

  public confBtns = ["Chiudi"];

  constructor() { }

  ngOnInit() {}

}
