import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Location } from '@angular/common';
import { RuleService } from '../services/rule/rule.service';
import { RuleCompletedService } from '../services/ruleCompleted/rule-completed.service';
import { RuleCompleted } from '../models/ruleCompleted/rule-completed';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { Rule } from '../models/rule/rule';
import { Notification } from '../models/notification/notification';
import { NotificationService } from '../services/notification/notification.service';
import { AdminReciveNotificationService } from '../services/adminReciveNotification/admin-recive-notification.service';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';
import { AdminService } from '../services/admin/admin.service';
import { FileService } from '../services/file/file.service';

@Component({
  selector: 'app-send-rule',
  templateUrl: './send-rule.page.html',
  styleUrls: ['./send-rule.page.scss'],
})

export class SendRulePage implements OnInit {
  
  public user: User;
  notification: Notification;
  public data: any;
  public idRule: number = 1; //l'id deve essere ricevuto dalla pagina precedente
  public ruleCompleted: RuleCompleted
  team: Team;
  admins: Admin[];
  public rule: Rule;
  file: any;

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
          this.ruleCompleted.status = 0;
          this.ruleCompleted.user = this.user;
          const rule = new Rule();
          rule.id = this.idRule;
          this.ruleCompleted.rule = rule;
        }

        if(this.file){
          this.fileService.uploadFile(this.file).subscribe((data: any) => {
            console.log(data);
            let attached = data.id;
            this.ruleCompleted.attached = attached;
            this.ruleCompletedService.insertRuleCompleted(this.ruleCompleted).subscribe(data => {
              console.log(data)
            });
            this.location.back();
          }), (error: any) => {
            console.log(error);
          };
        } else {
          this.ruleCompletedService.insertRuleCompleted(this.ruleCompleted).subscribe(data => {
            console.log(data)
          });
          this.location.back();
      }
      }
    }
  ];
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private location: Location,
    private ruleService: RuleService,
    private ruleCompletedService: RuleCompletedService,
    private router: Router,
    private notificationService: NotificationService,
    private adminReciveNotificationService: AdminReciveNotificationService,
    private fileService: FileService,
    private adminService: AdminService
  ) {
    this.ruleCompleted = new RuleCompleted();
    this.user = new User();
    this.notification = new Notification();
    this.team = new Team();
    this.admins = [];
    this.rule = new Rule();
  }

  ngOnInit() {
    if (localStorage.getItem('team') == null || localStorage.getItem('team') == '') {
      this.router.navigate(['user/home'])
    }
    this.team = JSON.parse(localStorage.getItem('team') || '{}');

    if(localStorage.getItem('user') == null || localStorage.getItem('user') == '')
      this.router.navigate(['login']);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.rule= JSON.parse(localStorage.getItem('viewRule') || '{}');

    this.idRule = this.rule.id;

    this.ruleService.getRule(this.idRule).subscribe(data => {
      this.data = data
      console.log(data)
    });
  }

  loadFileFromDevice(event: any) {
    event.target.files = null;
    this.file = event.target.files[0];
  }

  closeModal() {
    this.file = null;
    this.modal.dismiss();
  }

  attach() {
    this.modal.dismiss();
  }
  backButton() {
    this.location.back();
  }

  sendNotification() {
    this.notification.title = "Regola completata";
    this.notification.description = "La regola " + this.rule.name +  " e' stata completata da " + this.user.username;
    this.notificationService.newNotification(this.notification, this.team.codice).subscribe(n => {
      console.log(n);
      this.getAdmins(n);
    },(error: Response) => {
      if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  getAdmins(n: Notification) {
    this.adminService.getAdmins(this.team.codice).subscribe(result => {
      this.admins = result;
      console.log(this.admins);
      this.passNotification(n);
    },(error: Response) => {
      if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }

  addAdminNotification(n: Notification){
    this.admins.forEach(admin => {
      this.adminReciveNotificationService.addNotification(admin.id, n.id).subscribe(n => {
        console.log(n);
      },(error: Response) => {
        if (error.status == 400) {
        console.log("Errore 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);});
    });
  }

  passNotification(n: Notification) {
    this.addAdminNotification(n);
  }
}
