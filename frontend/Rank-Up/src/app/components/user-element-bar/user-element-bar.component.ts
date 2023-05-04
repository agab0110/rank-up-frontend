import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-element-bar',
  templateUrl: './user-element-bar.component.html',
  styleUrls: ['./user-element-bar.component.scss'],
})
export class UserElementBarComponent  implements OnInit {
  @Input() labelText: any;
  @Input() buttonText: any;

  constructor() { }

  ngOnInit() {}

}
