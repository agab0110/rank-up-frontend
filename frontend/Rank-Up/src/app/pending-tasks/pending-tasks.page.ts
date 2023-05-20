import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.page.html',
  styleUrls: ['./pending-tasks.page.scss'],
})
export class PendingTasksPage implements OnInit {

  public user: User;
  public rules: any
  public tasks: any

  constructor(
    private location: Location,
    private ruleCompletedService: RuleCompletedService,
    private taskCompletedService: TaskCompletedService,
    private router: Router
  ) { 
    this.user = new User();
  }

  ngOnInit() {
    localStorage.setItem('teamId', '');
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.ruleCompletedService.getPending(1).subscribe(data => {
      this.rules = data;
      this.taskCompletedService.getPending(1).subscribe(data => {
        this.tasks = data;
      });
    })
  }

  backButton() {
    this.location.back();
  }

}
