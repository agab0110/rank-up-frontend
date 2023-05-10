import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.teamUrl = 'http://localhost:8080/teamApi'
  }

  public changeTeamName(teamId: number, teamName: string) {
    return this.http.patch(
      this.teamUrl + "/changeName/" + teamId, teamName
    );
  }

  public deleteTeam(teamId: number) {
    return this.http.delete(
      this.teamUrl + "/deleteTeam/" + teamId
    );
  }
}
