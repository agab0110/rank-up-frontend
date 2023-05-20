import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.page.html',
  styleUrls: ['./pending-tasks.page.scss'],
})
export class PendingTasksPage implements OnInit {

  public rules: any
  public tasks: any

  constructor(
    private location: Location,
    private ruleCompletedService: RuleCompletedService
  ) { }

  ngOnInit() {
    this.ruleCompletedService.getPending(2).subscribe(data => {
      this.rules = data;
    })
  }

  backButton() {
    this.location.back();
  }

}
