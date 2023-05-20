import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Location } from '@angular/common';
import { RuleService } from '../services/rule/rule.service';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { Rule } from '../models/rule/rule';
import { timeStamp } from 'console';

@Component({
  selector: 'app-send-rule',
  templateUrl: './send-rule.page.html',
  styleUrls: ['./send-rule.page.scss'],
})

export class SendRulePage implements OnInit {

  public user: User;
  public data: any;
  public id_rule: number = 1; //l'id deve essere ricevuto dalla pagina precedente
  public ruleCompleted: RuleCompleted

  public descrBtns = ["Chiudi"];
  public confirmBtns = [
    {
      text: 'Annulla',
      cssClass: 'alert-button-red',
    },
    {
      text: 'Conferma',
      cssClass: 'alert-button-blue',
      handler: () => {
        if(this.data) {
          if(this.blobURL) {
            this.ruleCompleted.attached = this.blobURL;
          }
          this.ruleCompleted.status = 0;
          this.ruleCompleted.user = this.user;
          const rule = new Rule();
          rule.id = this.id_rule;
          this.ruleCompleted.rule = rule;
        }
    
        this.ruleCompletedService.insertRuleCompleted(this.ruleCompleted).subscribe(data => {
          console.log(data)
        });
      }
    }
  ];
  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL: string | undefined | null;

  constructor(
    private location: Location,
    private ruleService: RuleService,
    private ruleCompletedService: RuleCompletedService,
    private router: Router
  ) { 
    this.ruleCompleted = new RuleCompleted();
    this.user = new User();
  }

  ngOnInit() {
    localStorage.setItem('teamId', '');
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    
    this.ruleService.getRule(this.id_rule).subscribe(data => {
      this.data = data
      console.log(data)
    });
  }

  loadFileFromDevice(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      this.blobURL = URL.createObjectURL(this.blob);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  closeModal() {
    this.blob = null;
    this.blobURL = null;
    this.modal.dismiss();
  }

  attach() {
    this.modal.dismiss();
  }
  backButton() {
    this.location.back();
  }
}
