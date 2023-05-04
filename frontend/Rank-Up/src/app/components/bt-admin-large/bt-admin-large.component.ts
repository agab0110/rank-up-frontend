import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bt-admin-large',
  templateUrl: './bt-admin-large.component.html',
  styleUrls: ['./bt-admin-large.component.scss'],
})
export class BtAdminLargeComponent  implements OnInit {
  @Input() text: any;
  
  constructor() { }

  ngOnInit() {}

}
