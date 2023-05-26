import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/models/admin/admin';
import { Team } from 'src/app/models/team/team';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = "http://localhost:8080/adminManageTeamApi"
  }

  public newAdmin(idUser: number, idTeam: number) {
    const params = new HttpParams()
      .set('idUser', idUser.toString())
      .set('idTeam', idTeam.toString());
  
    return this.http.post<Admin>(
      this.baseUrl + "/addAdmin",
      { 'params': params }
    );
  }

  public getTeams(idUser: number) {
    return this.http.get<Team[]>(this.baseUrl + "/teams/" + idUser);
  }
}
