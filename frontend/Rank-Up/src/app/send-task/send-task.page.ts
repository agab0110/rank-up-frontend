import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskService } from '../services/task/task.service';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { Task } from '../models/task/task';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';

@Component({
  selector: 'app-send-task',
  templateUrl: './send-task.page.html',
  styleUrls: ['./send-task.page.scss'],
})

export class SendTaskPage implements OnInit {

  public user: User;
  public data: any;
  public idTask: any = 1; //l'id deve essere ricevuto dalla pagina precedente
  public taskCompleted: TaskCompleted;
  public task: Task;

  public descrBtns = ["Chiudi"];
  public confirmBtns = [
    {
      text: 'Annulla',
      cssClass: 'alert-button-red'
    },
    {
      text: 'Conferma',
      cssClass: 'alert-button-blue',
      handler: () => {
        if(this.data) {
          if(this.blobURL) {
            this.taskCompleted.attached = this.blobURL;
          }
          this.taskCompleted.status = 0;
          this.taskCompleted.user = this.user;
          const task = new Task();
          task.id = this.idTask;
          this.taskCompleted.task = task;
        }
    
        this.taskCompletedService.insertTaskCompleted(this.taskCompleted).subscribe((data: any) => {
          console.log(data)
        });
      }
    }
  ];
  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL: string | undefined | null;

  constructor(
    private location: Location,
    private taskService: TaskService,
    private taskCompletedService: TaskCompletedService,
    private router: Router
  ) { 
    this.taskCompleted = new TaskCompleted();
    this.user = new User();
    this.task = new Task();
  }

  ngOnInit() {
    localStorage.setItem('teamId', '');
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  
    this.taskService.getTask(this.idTask).subscribe(data => {
      this.data = data
      console.log(data)
    });
    this.location.back();

    this.task= JSON.parse(localStorage.getItem('viewTask') || '{}');
  }

  loadFileFromDevice(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      this.blobURL = URL.createObjectURL(this.blob);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  closeModal() {
    this.blob = null;
    this.blobURL = null;
    this.modal.dismiss();
  }

  attach() {
    this.modal.dismiss();
  }
  backButton() {
    this.location.back();
  }

}
