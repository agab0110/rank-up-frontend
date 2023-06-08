import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { host } from 'src/app/globalVariables/urlVariable';
import { Team } from 'src/app/models/team/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.teamUrl = host + "/teamApi";
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

  public getTeam(idUser: number, nameTeam: any) {
    return this.http.get(this.teamUrl + "/researchTeam/" + idUser + "/" + nameTeam);
  }

  public getAllTeams(idUser: number) {
    return this.http.get(this.teamUrl + "/getAllTeams/" + idUser);
  }

  public newTeam(team: Team) {
    return this.http.post<Team>(this.teamUrl + "/team", team)
  }

  public changePrivacyUser(teamId: number, privacy: boolean) {
    const params = new HttpParams().set('privacy', privacy);
    return this.http.patch<Team>(this.teamUrl + "/changePrivacyUser/" + teamId, params);
  }

  public changePrivacyTeam(teamId: number, privacy: boolean) {
    const params = new HttpParams().set('privacy', privacy);
    return this.http.patch<Team>(this.teamUrl + "/changePrivacyTeam/" + teamId, params);
  }

  public undo(teamId: any) {
    return this.http.delete(this.teamUrl + "/undo/" + teamId)
  }

  public getTeamByCode(teamCode: string): Observable<Team> {
    return this.http.get<Team>(this.teamUrl + "/getTeamByCode/" + teamCode);
  }
}
