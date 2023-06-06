import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Rule } from '../models/rule/rule';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { User } from '../models/user/user';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file/file.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-rule-completed',
  templateUrl: './user-rule-completed.page.html',
  styleUrls: ['./user-rule-completed.page.scss'],
})
export class UserRuleCompletedPage implements OnInit {

  ruleCompleted: RuleCompleted;
  user: User;
  rule: Rule;
  id: number;
  file: any;
  url: any = null;

  constructor(
    private location: Location,
    private ruleCompletedService: RuleCompletedService,
    private route: ActivatedRoute,
    private fileService: FileService,
    private alertController: AlertController
    ) {
    this.ruleCompleted = new RuleCompleted();
    this.user = new User();
    this.rule = new Rule();
    this.id = 0;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["ruleId"];
    });

    this.ruleCompletedService.getRuleCompleted(this.id).subscribe((response) => {
      this.ruleCompleted = response;
      this.rule = this.ruleCompleted.rule;
      this.user = this.ruleCompleted.user;
      console.log(response);

      if(this.ruleCompleted.attached != null) {
        this.fileService.getFile(this.ruleCompleted.attached).subscribe(file => {
          console.log(file);
          this.file = file;
          this.url = this.file.url;
        });
      } else {
        this.url = null;
      }
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

  async nullAttachedAlert() {
    const alert = await this.alertController.create({
      header: 'Allegato non presente!',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-blue' ,
        },
      ],
    });

    await alert.present();
  }
}
