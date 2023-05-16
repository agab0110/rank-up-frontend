import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Rule } from '../models/rule/rule';
import { RuleService } from '../services/rule/rule.service';
import { TaskService } from '../services/task/task.service';
import { Task } from '../models/task/task';
import { Team } from '../models/team/team';

@Component({
  selector: 'app-team-rules-tasks',
  templateUrl: './team-rules-tasks.page.html',
  styleUrls: ['./team-rules-tasks.page.scss'],
})
export class TeamRulesTasksPage implements OnInit {

  public alertBtns = ["Accetta", "Rifiuta"];
  type='rules';
  stato= false;
  rules : Rule[];
  tasks : Task[];
  team : Team;
  task : Task;
  rule : Rule;
  constructor(private location: Location, private ruleservice : RuleService, private taskservice :TaskService) {
    this.rules = new Array<Rule>;
    this.tasks = new Array<Task>;
    this.team = new Team();
    this.rule = new Rule();
    this.task = new Task();
    
   }

  ngOnInit() {
    this.listRule();
    this.listTask();
    if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
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
    this.ruleservice.listRule(this.rule.team.codice).subscribe(response =>{
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
    this.taskservice.listTask(this.task.team.codice).subscribe(response =>{
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
