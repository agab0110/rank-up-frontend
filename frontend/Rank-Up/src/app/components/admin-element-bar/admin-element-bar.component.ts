import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-element-bar',
  templateUrl: './admin-element-bar.component.html',
  styleUrls: ['./admin-element-bar.component.scss'],
})
export class AdminElementBarComponent  implements OnInit {
  @Input() labelText: any;
  @Input() buttonText: any;

  constructor() { }

  ngOnInit() {}

}
