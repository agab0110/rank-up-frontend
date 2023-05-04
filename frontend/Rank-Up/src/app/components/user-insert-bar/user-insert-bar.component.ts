import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-insert-bar',
  templateUrl: './user-insert-bar.component.html',
  styleUrls: ['./user-insert-bar.component.scss'],
})
export class UserInsertBarComponent  implements OnInit {
  @Input() labelText: any;
  @Input() buttonText: any;
  
  constructor() { }

  ngOnInit() {}

}
