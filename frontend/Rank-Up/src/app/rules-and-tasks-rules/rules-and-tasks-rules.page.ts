import { Component, OnInit } from '@angular/core';
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

  constructor() {
    this.user= new User;
    this.team = new Team();
  }

  ngOnInit() {
    //if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.team.name = "Team prova"  //Set nome del team per provare "Api" numero 54, cancellare dopo implementato il local Storage
    this.team.codice = 276387;  //Set codice del team per provare "Api" numero 54, cancellare dopo implementato il local Storage
    //if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
    //this.router.navigate(['user/home']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  text1: string = 'Regole'
  text2: string = 'Tasks'

  tasks: {
    task_name: string,
    task_points: number
  }[] = [{task_name: 'Fare la spesa entro mercoledi', task_points: 10}, {task_name: 'Fare 20 push-up in 3 minuti', task_points: 15}]

  rules: {
    rule_name: string,
    rule_points: number
  }[] = [{rule_name: 'Fare la spesa', rule_points: 10}, {rule_name: 'Fare 20 push-up', rule_points: 15}]

  rules_tasks: {
    rule_task_name: string
    rule_task_points: number
  }[] = []

  switch(event: any) {
    if (event.detail.value === this.text1) {
      this.rules_tasks = []
      this.rules.forEach(rule => {
        this.rules_tasks.push({
          rule_task_name: rule.rule_name,
          rule_task_points: rule.rule_points
        });
      });
    } else {
      if (event.detail.value === this.text2) {
        this.rules_tasks = []
        this.tasks.forEach(task => {
          this.rules_tasks.push({
            rule_task_name: task.task_name,
            rule_task_points: task.task_points
          });
        });
      }
    }
  }
}
