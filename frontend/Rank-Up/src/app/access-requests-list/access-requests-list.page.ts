import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';

@Component({
  selector: 'app-access-requests-list',
  templateUrl: './access-requests-list.page.html',
  styleUrls: ['./access-requests-list.page.scss'],
})
export class AccessRequestsListPage implements OnInit {
  userJoinsTeam: UserJoinsTeam;
  requests : Notification[];
  team: Team;
  admin: Admin;
  userJoin: UserJoinsTeam[];

  constructor(
    private location: Location,
    private alertController: AlertController,
    private userJoinsTeamService: UserJoinsTeamService
    ) {
      this.userJoinsTeam = new UserJoinsTeam();
      this.requests = new Array<Notification>;
      this.userJoin = new Array<UserJoinsTeam>;
      this.team = new Team();
      this.admin = new Admin();
    }

  ngOnInit() {
       //this.router.navigate(['user/home']);
       this.team = JSON.parse(localStorage.getItem('team') || '{}');
       if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
         //this.router.navigate(['user/home']);
       this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
       this.getRequest();
  }

  backButton() {
    this.location.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Accettare l'utente [Nome Utente] nel Team [Nome Team]?",
      buttons: [
        {
          text: 'Accetta',
          cssClass: 'alert-button-blue',
        },
        {
          text: 'Rifiuta',
          cssClass: 'alert-button-red',
          handler: () => {
            this.deleteRequest();
          }
        },
      ],
    });

  await alert.present();
  }

  deleteRequest(){
    this.userJoinsTeamService.deleteRequest(this.userJoinsTeam);
  }

 /* public getRequests(){
    this.userJoinsTeamService.getListPendingRequests(this.team.codice).subscribe(response =>{
      this.requests = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }*/
  public getRequest(){
    this.userJoinsTeamService.getRequests(1).subscribe(response =>{
      this.userJoin = response;
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }
}
