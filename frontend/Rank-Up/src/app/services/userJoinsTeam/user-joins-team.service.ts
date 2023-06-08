import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { host } from 'src/app/globalVariables/urlVariable';
import { Team } from 'src/app/models/team/team';
import { User } from 'src/app/models/user/user';
import { UserJoinsTeam } from 'src/app/models/userJoinsTeam/user-joins-team';

@Injectable({
  providedIn: 'root'
})
export class UserJoinsTeamService {
  status!: string;
  userJoinsTeamUrl: string;

  constructor(private http: HttpClient) {
    this.userJoinsTeamUrl = host + "/userJoinsTeamApi";
   }

   addUserByCOde(codeTeam: any, idUser: number) {
    const params = new HttpParams()
    .set('codeTeam', codeTeam.toString())
    .set('idUser', idUser.toString());
    
    return this.http.post<UserJoinsTeam>(this.userJoinsTeamUrl + "/addUserByCode",null,{params});
  }

   deleteRequest(id: number) {
    return this.http.delete(this.userJoinsTeamUrl + "/deleteRequest/" + id);
  }

  public getListUserSearch(username: string): Observable<User[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<User[]>(this.userJoinsTeamUrl + "/list/userSearch", {params});
  }

  public getListUserJoinsTeamSearch(id_team: number, username: string): Observable<UserJoinsTeam[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<UserJoinsTeam[]>(this.userJoinsTeamUrl + "/list/userjoinsteamsearch/" + id_team , {params});
  }

  public getListPendingRequests(id_team: number): Observable<Notification[]> {
    const params = new HttpParams().set('id_team', id_team);
    return this.http.get<Notification[]>(this.userJoinsTeamUrl + "/list/pendingRequests",  {params})
  }

  public getPartecipants(idTeam: number): Observable<User[]> {
    return this.http.get<User[]>(this.userJoinsTeamUrl + "/partecipants/" + idTeam);
  }

  public getPartecipantsPoints(idTeam: number): Observable<UserJoinsTeam[]> {
    return this.http.get<UserJoinsTeam[]>(this.userJoinsTeamUrl + "/partecipantsPoints/" + idTeam);
  }

  public getRequests(idTeam: number):Observable<UserJoinsTeam[]>{
    return this.http.get<UserJoinsTeam[]>(this.userJoinsTeamUrl + "/requests/" + idTeam);
  }

  public addUser(idTeam:number, idUser:Number){
    const params = new HttpParams()
    .set('idTeam', idTeam.toString())
    .set('idUser', idUser.toString());
    
    return this.http.post<UserJoinsTeam>(this.userJoinsTeamUrl + "/addUser",null,{params});
  }

  public subtractUserPoints(idTeam: number, idUser: number, idPrize: number): Observable<UserJoinsTeam> {
    const body = {
      idTeam: idTeam,
      idUser: idUser,
      idPrize: idPrize
    }
    return this.http.patch<UserJoinsTeam>(this.userJoinsTeamUrl + "/subtractUserPoints/" + body.idTeam + "/" + body.idUser + "/" + body.idPrize, body);
  }

  public getTeams(idUser: number) {
    return this.http.get<Team[]>(this.userJoinsTeamUrl + "/teams/" + idUser);
  }

  public manageRequest(idTeam: number, idUser: number, status: string) {
    return this.http.patch(this.userJoinsTeamUrl + "/manageRequest/" + idTeam + "/" + idUser, status);
  }

  public getrequests(idTeam: number):Observable<UserJoinsTeam[]>{
    return this.http.get<UserJoinsTeam[]>(this.userJoinsTeamUrl + "/requests/" + idTeam);
  }

  public removeUserFromTeam(idTeam: number, idUser: number) {
    return this.http.delete<UserJoinsTeam>(this.userJoinsTeamUrl + "/removeUser/" + idTeam + "/" + idUser);
  }

  public leveTeam(idTeam:number, idUser:number){
    return this.http.delete<UserJoinsTeam>(this.userJoinsTeamUrl + "/leaveTeam/"+ idTeam + "/"+ idUser);
  }
}
