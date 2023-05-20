import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';

@Component({
  selector: 'app-task-confirmation',
  templateUrl: './task-confirmation.page.html',
  styleUrls: ['./task-confirmation.page.scss'],
})
export class TaskConfirmationPage implements OnInit {

  data: any
  stato = false
  id = 2 // id ricevuto dalla schermata precedente
  public user: User;
  ruleCompleted: RuleCompleted

  constructor(
    private alertController: AlertController, 
    private router: Router,
    private location: Location, 
    private ruleCompletedService: RuleCompletedService,
    private taskCompletedService: TaskCompletedService
  ) { 
    this.user = new User();
    this.ruleCompleted = new RuleCompleted();
  }

  ngOnInit() {
    localStorage.setItem('teamId', '');
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

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

  invia(status:number) {
    this.ruleCompleted.id = this.id
    this.ruleCompleted.status = status
    this.ruleCompleted.comment = "grggr"

    this.taskCompletedService.confirmationTaskCompleted(this.id, status, this.ruleCompleted).subscribe(data => {
      console.log(data)
    })
  }
}
