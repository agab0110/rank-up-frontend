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
    return this.http.patch<Team>(
      this.teamUrl + "/changeName/" + teamId, teamName
    );
  }

  public deleteTeam(teamId: number) {
    console.log(this.teamUrl + '/deleteTeam/' + teamId);
    return this.http.delete(
      this.teamUrl + '/deleteTeam/' + teamId
    );
  }

  public changePhoto(userId: number, photo: string) {
    return this.http.patch<Team>(this.teamUrl + "/changePhoto" + "/" + userId, photo);
  }

  public getTeam(nameTeam: any) {
    return this.http.get(this.teamUrl + "/researchTeam/" + nameTeam);
  }

  public getTeamRand() {
    return this.http.get(this.teamUrl + "/researchTeam");
  }
}
