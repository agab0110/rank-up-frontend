import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from 'src/app/models/team/team';

@Injectable({
  providedIn: 'root'
})
export class AdminManageTeamService {
  adminManageTeamUrl: string;

  constructor(private http: HttpClient) {
    this.adminManageTeamUrl = 'http://localhost:8080/adminManageTeamApi';
  }

  public getTeams(idUser: number) {
    return this.http.get<Team[]>(this.adminManageTeamUrl + "/teams/" + idUser);
  }
}
