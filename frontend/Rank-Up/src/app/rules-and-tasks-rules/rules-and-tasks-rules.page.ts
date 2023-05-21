import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Rule } from '../models/rule/rule';
import { RuleService } from '../services/rule/rule.service';
import { TaskService } from '../services/task/task.service';
import { Task } from '../models/task/task';
import { User } from '../models/user/user';
import { Team } from '../models/team/team';

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
  constructor(private location: Location, private ruleservice : RuleService, private taskservice :TaskService) {
    this.rules = new Array<Rule>;
    this.tasks = new Array<Task>;
    this.team = new Team();
    this.rule = new Rule();
    this.task = new Task();
    this.user = new User();

   }

  ngOnInit() {
    this.listRule();
    this.listTask();
    //if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    //this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.team.name = "Team prova";
    this.team.codice= 38457
    //if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
    //this.router.navigate(['user/home']);
    //this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
  }


  backButton() {
    this.location.back();
  }
  segmentChanged(event: any) {
    this.stato = !this.stato;
  }
  listRule(){
    this.rule.team = this.team;
    this.ruleservice.listRule(1).subscribe(response =>{
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
    this.task.team = this.team;
    this.taskservice.listTask(1).subscribe(response =>{
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
}
