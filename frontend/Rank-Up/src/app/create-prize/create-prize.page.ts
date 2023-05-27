import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Prize } from '../models/prize/prize';
import { PrizeService } from '../services/prize/prize.service';
import { Team } from '../models/team/team';
import { Router } from '@angular/router';
import { Admin } from '../models/admin/admin';
import { TeamService } from '../services/team/team.service';
import { User } from '../models/user/user';

@Component({
  selector: 'app-create-prize',
  templateUrl: './create-prize.page.html',
  styleUrls: ['./create-prize.page.scss'],
})
export class CreatePrizePage implements OnInit {
  prize : Prize;
  team: Team;
  admin: Admin;
  user:User;

  constructor(
    private location: Location,
    private prizeService: PrizeService,
    private router: Router,
    private teamService: TeamService) {

    this.prize = new Prize();
    this.team = new Team();
    this.admin = new Admin();
    this.user = new User();
   }

  ngOnInit() {
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    if (localStorage.getItem('team') == null) {
      this.router.navigate(["/user/home"]);
    }
    if (localStorage.getItem('user') == null) {
      this.router.navigate(["/login"]);
    }

  }

  backButton() {
    this.location.back();
  }

  public createPrize(){
    this.prize.beloggingTeam = this.team;     //setta il team tramite localStorage, api 9
    this.prize.admin = this.admin;            //setta l'admin tramite localStorage, api 9
    this.prizeService.newPrize(this.prize).subscribe(response => {
      console.log("Premio creato con successo");
      console.log(response);
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
