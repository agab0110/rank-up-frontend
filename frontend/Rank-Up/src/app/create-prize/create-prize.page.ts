import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Prize } from '../models/prize/prize';
import { PrizeService } from '../services/prize/prize.service';
import { Team } from '../models/team/team';
import { Router } from '@angular/router';
import { Admin } from '../models/admin/admin';
import { TeamService } from '../services/team/team.service';

@Component({
  selector: 'app-create-prize',
  templateUrl: './create-prize.page.html',
  styleUrls: ['./create-prize.page.scss'],
})
export class CreatePrizePage implements OnInit {
  prize : Prize;
  team: Team;
  admin: Admin;

  constructor(
    private location: Location,
    private prizeService: PrizeService,
    private router: Router,
    private teamService: TeamService) {

    this.prize = new Prize();
    this.team = new Team();
    this.admin = new Admin();
   }

  ngOnInit() {
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.team = JSON.parse(localStorage.getItem('team') || '{}');
  if(localStorage.getItem('team') == null || localStorage.getItem('team') == '')
    this.router.navigate(['user/home']);
  if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '')
    this.router.navigate(['user/home']);
  
  }

  backButton() {
    this.location.back();
  }

  public createPrize(){
    this.prize.beloggingTeam = this.team;    
    this.prize.admin = this.admin;           
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
