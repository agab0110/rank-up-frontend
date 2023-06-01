import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RuleService } from '../services/rule/rule.service';
import { Rule } from '../models/rule/rule';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-rule',
  templateUrl: './create-rule.page.html',
  styleUrls: ['./create-rule.page.scss'],
})
export class CreateRulePage implements OnInit{
  rule: Rule;
  team: Team;
  admin: Admin;
  user:User;

  constructor(
    private location: Location,
    private ruleService:  RuleService,
    private router: Router,
    private alertController: AlertController
    ) {
    this.rule = new Rule();
    this.team = new Team();
    this.admin = new Admin();
    this.user = new User();
  }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }
    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }

  }

  backButton() {
    this.location.back();
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Regola creata con successo!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async emptyNameAlert() {
    const alert = await this.alertController.create({
      header: 'Nome della regola vuoto, regola non creata',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async emptyPointsAlert() {
    const alert = await this.alertController.create({
      header: 'Punti della regola mancanti, regola non creata',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async emptyDescriptionAlert() {
    const alert = await this.alertController.create({
      header: 'Descrizione della regola vuota, regola non creata',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  async rejectedAlert() {
    const alert = await this.alertController.create({
      header: 'Errore nella creazione della regola!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

  public createRule(){
    if(!this.rule.name){
      this.emptyNameAlert();
    }
    if(!this.rule.points){
      this.emptyPointsAlert();
    }
    if(!this.rule.description){
      this.emptyDescriptionAlert();
    }
      this.rule.admin = this.admin;   //setta l'admin presente nel local storage, api 1
      this.rule.team = this.team;     //setta il team presente nel local storage, api 1
      this.ruleService.newRule(this.rule, this.rule.name).subscribe(response => {
      console.log("Regola creata con successo");
      console.log(response);
      this.confirmationAlert();
    }, (error: Response) => {
      if (error.status == 400){
        console.log("400 error");
        this.rejectedAlert();
      }
      else {
        console.log('An unexpected error occured');
        this.rejectedAlert();
      }
    });
  }
}
