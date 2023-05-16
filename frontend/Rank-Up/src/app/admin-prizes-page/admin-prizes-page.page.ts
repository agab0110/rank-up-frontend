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
  constructor(private location: Location, private pizeservice : PrizeService) { 
    this.prizes = new Array<Prize>;
    this.team = new Team();
  }

  ngOnInit() {
    this.Listprize();
    if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    //this.router.navigate(['user/home']);
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    //if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
    //this.router.navigate(['user/home']);
    //this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
  }

  backButton() {
    this.location.back();
  }
  Listprize(){
    this.pizeservice.listPrize(2).subscribe(response =>{
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
