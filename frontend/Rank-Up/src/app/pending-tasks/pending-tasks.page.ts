import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { Team } from '../models/team/team';
import { Rule } from '../models/rule/rule';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.page.html',
  styleUrls: ['./pending-tasks.page.scss'],
})
export class PendingTasksPage implements OnInit {

  public user: User;
  public rules: any
  public tasks: any
  public team: Team;

  constructor(
    private location: Location,
    private ruleCompletedService: RuleCompletedService,
    private taskCompletedService: TaskCompletedService,
    private router: Router
  ) {
    this.user = new User();
    this.team = new Team();
  }

  ngOnInit() {
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }

    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);

    this.ruleCompletedService.getPending(this.team.codice).subscribe(data => {
      this.rules = data;
      console.log(this.rules)
      this.taskCompletedService.getPending(this.team.codice).subscribe(data => {
        this.tasks = data;
        console.log(this.tasks)
      });
    })
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.rules = [];
      this.tasks = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  clickUserRule(rule: Rule) {
    let letRule = JSON.stringify(rule);
    localStorage.setItem("viewRule", letRule);
    this.router.navigate(['/rule-confirmation']);
  }

  
  clickUserTask(task: Task) {
    let letTask = JSON.stringify(task);
    localStorage.setItem("viewTask", letTask);
    console.log(letTask)
    this.router.navigate(['/task-confirmation']);
  }

  backButton() {
    this.location.back();
  }

}
