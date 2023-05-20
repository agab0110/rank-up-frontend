import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { UserJoinsTeam } from 'src/app/models/userJoinsTeam/user-joins-team';

@Injectable({
  providedIn: 'root'
})
export class UserJoinsTeamService {
  private accessRequestUrl: string;
  status!: string;
  userJoinsTeamUrl: string;

  constructor(private http: HttpClient) {
    this.accessRequestUrl = 'http://localhost:8080/accessRequestApi',
    this.userJoinsTeamUrl = 'http://localhost:8080/userJoinsTeamApi';
   }

   deleteRequest(userJoinTeam: UserJoinsTeam) {
    return this.http.delete(this.accessRequestUrl + "/deleteRequest")
    .subscribe(() => this.status = 'Delete successful');
  }

  public getListUserSearch(username: string): Observable<User[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<User[]>(this.userJoinsTeamUrl + "/list/userSearch", {params});
  }

  public getListPendingRequests(id_team: string): Observable<Notification[]> {
    const params = new HttpParams().set('id_team', id_team);
    return this.http.get<Notification[]>(this.accessRequestUrl + "/list/pendingRequests", {params})};

  public getPartecipants(id_team: Number): Observable<UserJoinsTeam[]> {
    return this.http.get<UserJoinsTeam[]>(this.userJoinsTeamUrl + "/partecipants/" + id_team)
  };
}
