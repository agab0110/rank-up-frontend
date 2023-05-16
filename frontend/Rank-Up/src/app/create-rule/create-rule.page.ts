import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RuleService } from '../services/rule/rule.service';
import { Rule } from '../models/rule/rule';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';

@Component({
  selector: 'app-create-rule',
  templateUrl: './create-rule.page.html',
  styleUrls: ['./create-rule.page.scss'],
})
export class CreateRulePage implements OnInit{
  rule: Rule;
  team: Team;
  admin: Admin;

  constructor(
    private location: Location,
    private ruleService:  RuleService
    ) {
    this.rule = new Rule();
    this.team = new Team();
    this.admin = new Admin();
  }

  ngOnInit(){
    if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
    //this.router.navigate(['user/home']);
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
  }

  backButton() {
    this.location.back();
  }

   /* getTeam(){
    this.teamService.getTeam(this.team.codice).subscribe(response =>{
      this.team = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  } */

  public createRule(){
      //this.rule.admin = this.admin;
      //this.rule.team = this.team;
      this.ruleService.newRule(this.rule).subscribe(response => {
      console.log("Regola creata con successo");
      console.log(response);
    }, (error: Response) => {
      if (error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }
}
