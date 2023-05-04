import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-insert-bar-noselect',
  templateUrl: './admin-insert-bar-noselect.component.html',
  styleUrls: ['./admin-insert-bar-noselect.component.scss'],
})
export class AdminInsertBarNoselectComponent  implements OnInit {
  @Input() labelText: any;
  @Input() buttonText: any;
  
  constructor() { }

  ngOnInit() {}

}
