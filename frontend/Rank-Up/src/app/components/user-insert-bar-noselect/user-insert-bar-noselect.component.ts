import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-insert-bar-noselect',
  templateUrl: './user-insert-bar-noselect.component.html',
  styleUrls: ['./user-insert-bar-noselect.component.scss'],
})
export class UserInsertBarNoselectComponent  implements OnInit {
  @Input() labelText: any;
  @Input() buttonText: any;
  
  constructor() { }

  ngOnInit() {}

}
