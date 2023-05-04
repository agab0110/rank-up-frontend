import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bt-user-large',
  templateUrl: './bt-user-large.component.html',
  styleUrls: ['./bt-user-large.component.scss'],
})
export class BtUserLargeComponent  implements OnInit {
  @Input() text: any;
  
  constructor() { }

  ngOnInit() {}

}
