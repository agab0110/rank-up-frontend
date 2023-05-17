import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskService } from '../services/task/task.service';
import { TaskCompleted } from '../models/taskCompleted/task-completed';
import { User } from '../models/user/user';
import { Router } from '@angular/router';

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
          const body = {
            "attached": this.blobURL,
            "status": 0,
            "id_user": this.user.id,
            "id_task": this.idTask,
          }
          this.taskCompletedService.insertTaskCompleted(body).subscribe((data: any) => {
            console.log(data)
          });
        }
      }
    }
  ];
  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL: string | undefined | null;
  taskCompletedService: any;

  constructor(
    private location: Location,
    private taskService: TaskService,
    private router: Router
  ) { 
    this.taskCompleted = new TaskCompleted();
    this.user = new User();
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
