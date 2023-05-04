import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bt-admin-small',
  templateUrl: './bt-admin-small.component.html',
  styleUrls: ['./bt-admin-small.component.scss'],
})
export class BtAdminSmallComponent  implements OnInit {
  @Input() text: any;
  constructor() { }

  ngOnInit() {}

}
