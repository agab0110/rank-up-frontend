import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bt-user-small',
  templateUrl: './bt-user-small.component.html',
  styleUrls: ['./bt-user-small.component.scss'],
})
export class BtUserSmallComponent  implements OnInit {

  @Input() text: string | undefined;

  constructor() { }

  ngOnInit() {}

}
