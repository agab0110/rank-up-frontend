import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { Task } from '../models/task/task';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.page.html',
  styleUrls: ['./completed-task.page.scss'],
})
export class CompletedTaskPage implements OnInit {

  taskCompleted: TaskCompleted;
  task: TaskCompleted;
  user: User;

  constructor(
    private location: Location,
    private taskCompletedService: TaskCompletedService
    ) {
    this.taskCompleted = new TaskCompleted();
    this.task = new TaskCompleted();
    this.user = new User();
   }

  ngOnInit() {
    this.task= JSON.parse(localStorage.getItem('viewTask') || '{}');
  }

  backButton() {
    this.location.back();
  }
}
