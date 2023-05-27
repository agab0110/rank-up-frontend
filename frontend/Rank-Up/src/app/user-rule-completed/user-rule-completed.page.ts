import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Rule } from '../models/rule/rule';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { User } from '../models/user/user';

@Component({
  selector: 'app-user-rule-completed',
  templateUrl: './user-rule-completed.page.html',
  styleUrls: ['./user-rule-completed.page.scss'],
})
export class UserRuleCompletedPage implements OnInit {

  ruleCompleted: RuleCompleted;
  user: User;
  rule: Rule;

  constructor(
    private location: Location,
    private ruleCompletedService: RuleCompletedService
    ) { 
    this.ruleCompleted = new RuleCompleted();
    this.user = new User();
    this.rule = new Rule();
  }

  ngOnInit() {
    this.ruleCompletedService.getRuleCompleted(1).subscribe((response) => {
      this.ruleCompleted = response;
      this.rule = this.ruleCompleted.rule;
      this.user = this.ruleCompleted.user;
      console.log(response);
    });
    if(!this.rule.description)
    {
      this.rule.description = "Descrizione assente";
    }
    if(!this.ruleCompleted.comment)
    {
      this.ruleCompleted.comment = "Commento assente";
    }
  }

  backButton() {
    this.location.back();
  }
}
