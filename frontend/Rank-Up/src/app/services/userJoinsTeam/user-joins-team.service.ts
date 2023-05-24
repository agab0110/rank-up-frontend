import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { UserJoinsTeam } from 'src/app/models/userJoinsTeam/user-joins-team';

@Injectable({
  providedIn: 'root'
})
export class UserJoinsTeamService {
  status!: string;
  userJoinsTeamUrl: string;

  constructor(private http: HttpClient) {
    this.userJoinsTeamUrl = 'http://localhost:8080/userJoinsTeamApi';
   }

   deleteRequest(userJoinTeam: UserJoinsTeam) {
    return this.http.delete(this.userJoinsTeamUrl + "/deleteRequest")
    .subscribe(() => this.status = 'Delete successful');
  }

  public getListUserSearch(username: string): Observable<User[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<User[]>(this.userJoinsTeamUrl + "/list/userSearch", {params});
  }

  public getListPendingRequests(id_team: string): Observable<Notification[]> {
    const params = new HttpParams().set('id_team', id_team);
    return this.http.get<Notification[]>(this.userJoinsTeamUrl + "/list/pendingRequests",  {params})
  }

  public getPartecipants(idTeam: number): Observable<User[]> {
    return this.http.get<User[]>(this.userJoinsTeamUrl + "/partecipants/" + idTeam);
  }

  public getPartecipantsPoints(idTeam: number): Observable<UserJoinsTeam[]> {
    return this.http.get<UserJoinsTeam[]>(this.userJoinsTeamUrl + "/partecipantsPoints/" + idTeam);
  }
  public getrequests(idTeam: number):Observable<UserJoinsTeam[]>{
    return this.http.get<UserJoinsTeam[]>(this.userJoinsTeamUrl + "/requests/" + idTeam);
  }
  public addUser(u: UserJoinsTeam){
    return this.http.post<UserJoinsTeam>(this.userJoinsTeamUrl + "/addUser", u);
  }
}
