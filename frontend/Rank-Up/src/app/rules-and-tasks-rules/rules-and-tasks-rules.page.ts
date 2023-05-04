import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules-and-tasks-rules',
  templateUrl: './rules-and-tasks-rules.page.html',
  styleUrls: ['./rules-and-tasks-rules.page.scss'],
})
export class RulesAndTasksRulesPage implements OnInit {

  constructor() { }

  text1: string = 'Regole'
  text2: string = 'Tasks'

  team_name: string = 'Nome Team'
  team_code: string = '83r5gd'

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
  ngOnInit() {
    this.rules.forEach(rule => {
      this.rules_tasks.push({
        rule_task_name: rule.rule_name,
        rule_task_points: rule.rule_points
      });
    });
  }

}
