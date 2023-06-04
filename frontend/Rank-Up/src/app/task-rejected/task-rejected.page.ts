import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { Task } from '../models/task/task';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-task-rejected',
  templateUrl: './task-rejected.page.html',
  styleUrls: ['./task-rejected.page.scss'],
})
export class TaskRejectedPage implements OnInit {

  taskCompleted: TaskCompleted;
  task: TaskCompleted;
  user: User;
  file: any;
  url: any;

  constructor(
    private location: Location,
    private taskCompletedService: TaskCompletedService,
    private fileService: FileService
    ) {
    this.taskCompleted = new TaskCompleted();
    this.task = new TaskCompleted();
    this.user = new User();
   }

  ngOnInit() {
    this.task= JSON.parse(localStorage.getItem('viewTask') || '{}');

    this.fileService.getFile(this.task.attached).subscribe(file => {
      console.log(file);
      this.file = file;
      this.url = this.file.url;
    });
  }

  backButton() {
    this.location.back();
  }
}