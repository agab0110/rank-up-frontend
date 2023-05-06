import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.page.html',
  styleUrls: ['./pending-tasks.page.scss'],
})
export class PendingTasksPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButton() {
    this.location.back();
  }

}
