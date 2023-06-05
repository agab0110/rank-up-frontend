import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Rule } from '../models/rule/rule';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { User } from '../models/user/user';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-rule-rejected',
  templateUrl: './rule-rejected.page.html',
  styleUrls: ['./rule-rejected.page.scss'],
})
export class RuleRejectedPage implements OnInit {

  ruleCompleted: RuleCompleted;
  user: User;
  rule: RuleCompleted;
  file: any;
  url: any = null;
  
  constructor(
    private location: Location,
    private ruleCompletedService: RuleCompletedService,
    private fileService: FileService
    ) { 
    this.ruleCompleted = new RuleCompleted();
    this.user = new User();
    this.rule = new RuleCompleted();
  }

  ngOnInit() {
    this.rule= JSON.parse(localStorage.getItem('viewRule') || '{}');
    if(this.rule.attached != null){
      this.fileService.getFile(this.rule.attached).subscribe(file => {
        console.log(file);
        this.file = file;
        this.url = this.file.url;
      });
    }
    else {
      this.url = null;
    }
  }

  backButton() {
    this.location.back();
  }

}
