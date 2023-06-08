import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { host } from 'src/app/globalVariables/urlVariable';
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
    this.baseUrl = host + "/adminManageTeamApi";
  }

  public newAdmin(idUser: number, idTeam: number) {  
    const params = new HttpParams()
    .set('idTeam', idTeam)
    .set('idUser', idUser);

    return this.http.post<Admin>(this.baseUrl + "/addAdmin", null, {params});
  }

  public getTeams(idUser: number) {
    return this.http.get<Team[]>(this.baseUrl + "/teams/" + idUser);
  }

  public getAdmin(idTeam: number, idUser: number) {
    return this.http.get<Admin>(this.baseUrl + "/getAdmin/" + idTeam + "/" + idUser);
  }

  public getAdmins(idTeam: number): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl + "/getAdmins/" + idTeam);
  }
}
