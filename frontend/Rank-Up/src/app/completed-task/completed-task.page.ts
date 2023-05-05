import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.page.html',
  styleUrls: ['./completed-task.page.scss'],
})
export class CompletedTaskPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }
}
