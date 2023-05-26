import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { TaskCompletedService } from '../services/taskCompleted/task-completed.service';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';

@Component({
  selector: 'app-rule-confirmation',
  templateUrl: './rule-confirmation.page.html',
  styleUrls: ['./rule-confirmation.page.scss'],
})
export class RuleConfirmationPage implements OnInit {

  
  data: any
  stato = false
  id = 1 // id ricevuto dalla schermata precedente
  public user: User;
  ruleCompleted: RuleCompleted;
  comment!: string;
  bonusPoints!: number;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private location: Location,
    private ruleCompletedService: RuleCompletedService,
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
    }
  }

  backButton() {
    this.location.back();
  }

  async presentAlertReject() {
    const alert = await this.alertController.create({
      header: 'Richesta Rifiutata',
      buttons: [
        {
          handler: () => {
            this.rejectActivity();
          },
          text: 'Chiudi',
          cssClass: 'alert-button-red',
        },
      ],
    });

  await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Richesta Accettata',
      buttons: [
        {
          handler: () => {
            this.confirmActivity();
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

  rejectActivity() {
    const status = 2;
    this.ruleCompletedService.ruleAcceptation(this.id, this.comment, this.bonusPoints, status);
    this.backButton();
  }

  confirmActivity() {
    const status = 1;
    this.ruleCompletedService.ruleAcceptation(this.id, this.comment, this.bonusPoints, status);
    this.backButton();
    }
}