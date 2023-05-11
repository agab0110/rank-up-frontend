import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserJoinsTeam } from 'src/app/models/userJoinsTeam/user-joins-team';

@Injectable({
  providedIn: 'root'
})
export class UserJoinsTeamService {
  private accessRequestUrl: string;
  status!: string;

  constructor(private http: HttpClient) {
    this.accessRequestUrl = 'http://localhost:8080/accessRequestApi'
   }

   deleteRequest(userJoinTeam: UserJoinsTeam) {
    return this.http.delete(this.accessRequestUrl + "/deleteRequest");
  }
}
