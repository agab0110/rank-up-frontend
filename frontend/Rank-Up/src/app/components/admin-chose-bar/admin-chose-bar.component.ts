import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-chose-bar',
  templateUrl: './admin-chose-bar.component.html',
  styleUrls: ['./admin-chose-bar.component.scss'],
})
export class AdminChoseBarComponent  implements OnInit {
  @Input() text1: any;
  @Input() text2: any;
  
  constructor() { }

  ngOnInit() {}

}
