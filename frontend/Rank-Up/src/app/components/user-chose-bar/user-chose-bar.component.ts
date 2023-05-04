import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-chose-bar',
  templateUrl: './user-chose-bar.component.html',
  styleUrls: ['./user-chose-bar.component.scss'],
})
export class UserChoseBarComponent  implements OnInit {
  @Input() text1: any;
  @Input() text2: any;
  @Input() default: any;
  @Input() type: any;

  constructor() { }

  ngOnInit() {}

}
