import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Prize } from '../models/prize/prize';
import { PrizeService } from '../services/prize/prize.service';
import { Team } from '../models/team/team';


@Component({
  selector: 'app-admin-prizes-page',
  templateUrl: './admin-prizes-page.page.html',
  styleUrls: ['./admin-prizes-page.page.scss'],
})
export class AdminPrizesPagePage implements OnInit {

  prizes:Prize[];
  team:Team;
  prize:Prize;
  constructor(private location: Location, private pizeservice : PrizeService) {
    this.prizes = new Array<Prize>;
    this.team = new Team();
    this.prize = new Prize();
  }

  ngOnInit() {
    //if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    this.listPrize();
    this.team.name = "Team prova";
    //this.router.navigate(['user/home']);
    //this.team = JSON.parse(localStorage.getItem('team') || '{}');
    //if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
    //this.router.navigate(['user/home']);
    //this.admin = JSON.parse(localStorage.getItem('admin') || '{}');

  }

  backButton() {
    this.location.back();
  }
  listPrize(){
    this.team.codice = 1;
    this.prize.beloggingTeam = this.team;
    this.pizeservice.listPrize(this.team.codice).subscribe(response =>{
      this.prizes = response;
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
