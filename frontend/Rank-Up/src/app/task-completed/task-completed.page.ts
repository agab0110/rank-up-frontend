import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.page.html',
  styleUrls: ['./task-completed.page.scss'],
})
export class TaskCompletedPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }
}
