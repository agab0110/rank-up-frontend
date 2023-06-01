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

  public createRule(){
      this.rule.admin = this.admin;   //setta l'admin presente nel local storage, api 1
      this.rule.team = this.team;     //setta il team presente nel local storage, api 1
      this.ruleService.newRule(this.rule, this.rule.name).subscribe(response => {
      console.log("Regola creata con successo");
      console.log(response);
    },async (error: Response) => {
      console.log(error);
      const alert = await this.alertController.create({
        header: "Nome già in uso",
        message: "Inserire un altro nome",
        cssClass: 'alert-button-red',
        buttons: ['Chiudi']
      });
      await alert.present();
    });
  }
}
