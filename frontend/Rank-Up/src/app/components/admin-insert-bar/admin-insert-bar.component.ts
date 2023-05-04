import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-insert-bar',
  templateUrl: './admin-insert-bar.component.html',
  styleUrls: ['./admin-insert-bar.component.scss'],
})
export class AdminInsertBarComponent  implements OnInit {
  @Input() labelText: any;
  @Input() buttonText: any;
  
  constructor() { }

  ngOnInit() {}

}
