import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Rule } from '../models/rule/rule';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { User } from '../models/user/user';

@Component({
  selector: 'app-admin-rule-completed',
  templateUrl: './admin-rule-completed.page.html',
  styleUrls: ['./admin-rule-completed.page.scss'],
})
export class AdminRuleCompletedPage implements OnInit {

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
  }

  backButton() {
    this.location.back();
  }

}
