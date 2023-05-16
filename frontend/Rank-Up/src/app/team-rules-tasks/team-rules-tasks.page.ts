import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Rule } from '../models/rule/rule';
import { RuleService } from '../services/rule/rule.service';
import { TaskService } from '../services/task/task.service';
import { Task } from '../models/task/task';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';

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
  admin: Admin;

  constructor(private location: Location, private ruleservice : RuleService, private taskservice :TaskService) {
    this.rules = new Array<Rule>;
    this.tasks = new Array<Task>;
    this.team = new Team();
    this.admin = new Admin();
   }

  ngOnInit() {
    this.ListRule();
    this.ListTask();
    if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')//{
      //this.router.navigate(['user/home']);
    //}
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    /*if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == ''){
      this.router.navigate(['user/home']);
    }*/
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
  }


  backButton() {
    this.location.back();
  }
  segmentChanged(event: any) {
    this.stato = !this.stato;
  }
  ListRule(){
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

  ListTask(){
    this.taskservice.listTask(2).subscribe(response =>{
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
