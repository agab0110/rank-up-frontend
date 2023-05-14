import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';

@Component({
  selector: 'app-task-confirmation',
  templateUrl: './task-confirmation.page.html',
  styleUrls: ['./task-confirmation.page.scss'],
})
export class TaskConfirmationPage implements OnInit {

  data: any
  stato = false
  id = 1

  constructor(
    private alertController: AlertController, 
    private location: Location, 
    private ruleCompletedService: RuleCompletedService,
    private taskCompletedService: TaskCompletedService
  ) { }

  ngOnInit() {
    if(this.id) {
      this.ruleCompletedService.getRuleDelivered(this.id).subscribe(data => {
        this.data = JSON.parse(JSON.stringify(data))
        console.log(data)
      })
    } else {
      this.taskCompletedService.getTaskDelivered(this.id).subscribe(data => {
        this.data = JSON.parse(JSON.stringify(data))
        console.log(data)
      })      
    }
  }

  backButton() {
    this.location.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Richesta Archiviata',
      buttons: [
        {
          handler: () => { 
            this.backButton()
          },  
          text: 'Chiudi',
          cssClass: 'alert-button-red',
        },
      ],
    });

  await alert.present();
  }


  mostra() {
    this.stato = !this.stato;
  }
}
