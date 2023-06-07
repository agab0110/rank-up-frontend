import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { User } from '../models/user/user';
import { FileService } from '../services/file/file.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-rule-completed',
  templateUrl: './admin-rule-completed.page.html',
  styleUrls: ['./admin-rule-completed.page.scss'],
})
export class AdminRuleCompletedPage implements OnInit {

  ruleCompleted: RuleCompleted;
  user: User;
  rule: RuleCompleted;
  file: any;
  url: any = null;

  constructor(
    private location: Location,
    private ruleCompletedService: RuleCompletedService,
    private fileService: FileService,
    private alertController: AlertController
    ) {
    this.ruleCompleted = new RuleCompleted();
    this.user = new User();
    this.rule = new RuleCompleted();
  }

  ngOnInit() {
    this.rule= JSON.parse(localStorage.getItem('viewRule') || '{}');

    console.log(this.rule);
    if(this.rule.attached != null) {
      this.fileService.getFile(this.rule.attached).subscribe(file => {
        console.log(file);
        this.file = file;
        this.url = this.file.url || null;
      });
    }
    else {
      this.url = null;
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
          cssClass: 'alert-button-red' ,
        },
      ],
    });

    await alert.present();
  }

}
