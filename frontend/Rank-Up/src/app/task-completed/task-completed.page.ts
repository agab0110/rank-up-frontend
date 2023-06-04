import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { Task } from '../models/task/task';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.page.html',
  styleUrls: ['./task-completed.page.scss'],
})
export class TaskCompletedPage implements OnInit {
  
  taskCompleted: TaskCompleted;
  task: Task;
  user: User;
  id: number;
  file: any;
  url: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private taskCompletedService: TaskCompletedService,
    private fileService: FileService
    ) {
    this.taskCompleted = new TaskCompleted();
    this.task = new Task();
    this.user = new User();
    this.id = 0;
   }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["taskId"];
    });

    this.taskCompletedService.getTaskCompleted(this.id).subscribe((response) => {
      this.taskCompleted = response;
      this.task = this.taskCompleted.task;
      this.user = this.taskCompleted.user;
      console.log(response);
      this.fileService.getFile(this.taskCompleted.attached).subscribe(file => {
        console.log(file);
        this.file = file;
        this.url = this.file.url;
      });
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