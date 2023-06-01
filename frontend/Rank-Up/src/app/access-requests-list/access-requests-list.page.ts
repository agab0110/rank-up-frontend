import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { UserJoinsTeamService } from '../services/userJoinsTeam/user-joins-team.service';
import { UserJoinsTeam } from '../models/userJoinsTeam/user-joins-team';
import { Team } from '../models/team/team';
import { Admin } from '../models/admin/admin';
import { User } from '../models/user/user';

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
  user: User;
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
      this.user = new User();
    }

  ngOnInit() {
       //this.router.navigate(['user/home']);
       this.team = JSON.parse(localStorage.getItem('team') || '{}');
       if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
         //this.router.navigate(['user/home']);
       this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
       this.user = JSON.parse(localStorage.getItem('user') || '{}');

       this.getRequest();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.userJoin = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  backButton() {
    this.location.back();
  }

  async presentAlert(u: UserJoinsTeam) {
    const alert = await this.alertController.create({
      header: "Accettare l'utente " + u.user.name + " nel Team " + u.team.name + "?",
      buttons: [
        {
          text: 'Accetta',
          cssClass: 'alert-button-blue',
          handler: () => {
            this.manageRequest(u.user.id);
          }
        },
        {
          text: 'Rifiuta',
          cssClass: 'alert-button-red',
          handler: () => {
            this.deleteRequest(u.id);
          }
        },
      ],
    });

    await alert.present();
  }

  deleteRequest(id: number){
    this.userJoinsTeamService.deleteRequest(id).subscribe(() => {
      console.log('Delete successful');
    }, (error: Response) => {
      if(error.status == 400)
        console.log("400 error");
      else {
        console.log('An unexpected error occured');
      }
      console.log(error);
    });
  }

  public getRequest(){
    this.userJoinsTeamService.getRequests(this.team.codice).subscribe(response =>{
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

  public manageRequest(id: number) {
    this.userJoinsTeamService.manageRequest(this.team.codice, id, "1").subscribe(() => {
      console.log("patch successful");
    }, (error: Response) => {
      if (error.status == 400) {
        console.log("Error 400");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    }
    );
  }
}
