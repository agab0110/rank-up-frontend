import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Rule } from '../models/rule/rule';
import { RuleService } from '../services/rule/rule.service';
import { TaskService } from '../services/task/task.service';
import { Task } from '../models/task/task';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules-and-tasks-rules',
  templateUrl: './rules-and-tasks-rules.page.html',
  styleUrls: ['./rules-and-tasks-rules.page.scss'],
})
export class RulesAndTasksRulesPage implements OnInit {
  user: User;
  team: Team;

  public alertBtns = ["Accetta", "Rifiuta"];
  type='rules';
  stato= false;
  rules : Rule[];
  tasks : Task[];
  task : Task;
  rule : Rule;
  constructor(private location: Location, private ruleservice : RuleService, private taskservice :TaskService,private router: Router) {
    this.rules = new Array<Rule>;
    this.tasks = new Array<Task>;
    this.team = new Team();
    this.rule = new Rule();
    this.task = new Task();
    this.user = new User();

   }

  ngOnInit() {
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    this.listRule();
    this.listTask();
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


  backButton() {
    this.location.back();
  }
  segmentChanged(event: any) {
    this.stato = !this.stato;
  }
  listRule(){
    this.ruleservice.listRule(this.team.codice).subscribe(response =>{
      this.rules = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  listTask(){
    this.taskservice.userTasks(this.team.codice, this.user.id).subscribe(response =>{
      this.tasks = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }
  clickRule(rule:Rule) {
    let rules = JSON.stringify(rule);
    localStorage.setItem("viewRule", rules);
  }

  clickTask(task:Task) {
    let tasks = JSON.stringify(task);
    localStorage.setItem("viewTask", tasks);
  }
}
