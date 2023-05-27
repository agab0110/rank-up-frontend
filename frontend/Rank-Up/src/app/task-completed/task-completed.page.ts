import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { Task } from '../models/task/task';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.page.html',
  styleUrls: ['./task-completed.page.scss'],
})
export class TaskCompletedPage implements OnInit {
  taskCompleted: TaskCompleted;
  task: Task;
  user: User;

  constructor(
    private location: Location,
    private taskCompletedService: TaskCompletedService
    ) {
    this.taskCompleted = new TaskCompleted();
    this.task = new Task();
    this.user = new User();
   }

  ngOnInit() {
    this.taskCompletedService.getTaskCompleted(1).subscribe((response) => {
      this.taskCompleted = response;
      this.task = this.taskCompleted.task;
      this.user = this.taskCompleted.user;
      console.log(response);
    });
    if(!this.taskCompleted.comment)
    {
      this.taskCompleted.comment = "Commento assente";
    }
  }

  backButton() {
    this.location.back();
  }
}