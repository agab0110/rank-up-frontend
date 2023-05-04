import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participants-points',
  templateUrl: './participants-points.page.html',
  styleUrls: ['./participants-points.page.scss'],
})
export class ParticipantsPointsPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  changePage() {
    this.router.navigate(['/participants']);
  }

}
