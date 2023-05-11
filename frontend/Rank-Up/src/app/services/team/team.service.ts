import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from 'src/app/models/team/team';

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
    return this.http.patch( //controllare se bisogna mettere <Team>
      this.teamUrl + "/changeName/" + teamId, teamName
    );
  }

  public deleteTeam(teamId: number) {
    return this.http.delete( //controllare se bisogna mettere <Team>
      this.teamUrl + "/deleteTeam/" + teamId
    );
  }
}
