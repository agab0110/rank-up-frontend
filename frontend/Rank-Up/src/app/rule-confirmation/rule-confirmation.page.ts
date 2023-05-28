import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
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
  public id!: number;
  private rule: any
  public user: User;
  ruleCompleted: RuleCompleted;
  comment!: string;
  bonusPoints!: number;
  status!: number;

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
    if (localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    localStorage.getItem('viewRule');
    this.rule = JSON.parse(localStorage.getItem('viewRule') || '{}')
    console.log(this.rule)
    this.id = this.rule.id_rule

    this.ruleCompletedService.getRuleDelivered(this.id).subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data))
      console.log(data)
    })
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
    this.ruleCompleted.comment = this.comment;
    this.ruleCompleted.bonus = this.bonusPoints;
    this.status = 2;

    this.ruleCompletedService.ruleAcceptation(this.id, this.status, this.ruleCompleted).subscribe(r => {
      console.log("patch succesfull");
      console.log(r);
    }, (error: Response) => {
      if (error.status == 400) {
        console.log("Error 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
    this.backButton();
  }

  confirmActivity() {
    this.ruleCompleted.comment = this.comment;
    this.ruleCompleted.bonus = this.bonusPoints;
    this.status = 1;

    this.ruleCompletedService.ruleAcceptation(this.id, this.status, this.ruleCompleted).subscribe(r => {
      console.log("patch succesfull");
      console.log(r);
    }, (error: Response) => {
      if (error.status == 400) {
        console.log("Error 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
    this.backButton();
  }
}