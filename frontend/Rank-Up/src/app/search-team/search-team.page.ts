import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TeamService } from '../services/team/team.service';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.page.html',
  styleUrls: ['./search-team.page.scss'],
})
export class SearchTeamPage implements OnInit {

  data: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private location: Location,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.getTeamRand().subscribe(data => {
      this.data = data
      console.log(data)
    })
  }

  backButton() {
    this.location.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Vuoi unirti al Team?',
      buttons: [
        {
          text: 'Sì',
          cssClass: 'alert-button-blue',
          handler: () => {
            this.router.navigate(["user/team"])
          }
        },
        {
          text: 'No',
          cssClass: 'alert-button-red',
        },
      ],
    });
    await alert.present();
  }

  ricerca(event: any) {
    if(event.target.value != "") {
      this.teamService.getTeam(event.target.value.toLowerCase()).subscribe(data => {
        this.data = JSON.parse(JSON.stringify(data))

        console.log(data)
      })      
    } else {
      this.teamService.getTeamRand().subscribe(data => {
        this.data = data
      })
    }
  }
}
