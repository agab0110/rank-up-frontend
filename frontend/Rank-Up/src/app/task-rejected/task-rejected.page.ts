import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-rejected',
  templateUrl: './task-rejected.page.html',
  styleUrls: ['./task-rejected.page.scss'],
})
export class TaskRejectedPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }
}
