import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { Task } from '../models/task/task';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.page.html',
  styleUrls: ['./completed-task.page.scss'],
})
export class CompletedTaskPage implements OnInit {

  taskCompleted: TaskCompleted;
  task: TaskCompleted;
  user: User;
  file: any;
  url: any = null;

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

    if(this.task.attached != null){
      this.fileService.getFile(this.task.attached).subscribe(file => {
        console.log(file);
        this.file = file;
        this.url = this.file.url;
      });
    }
    else {
      this.url = null;
    }
  }

  backButton() {
    this.location.back();
  }
}
