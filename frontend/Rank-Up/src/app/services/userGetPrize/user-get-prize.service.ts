import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { host } from 'src/app/globalVariables/urlVariable';
import { Prize } from 'src/app/models/prize/prize';
import { UserGetPrize } from 'src/app/models/userGetPrize/user-get-prize';

@Injectable({
  providedIn: 'root'
})
export class UserGetPrizeService {
  private userGetPrizeUrl: string;

  constructor(private http: HttpClient) {
    this.userGetPrizeUrl = host + "/userGetPrizeApi";
  }

  public getUserPrizes(userId: number, teamId: number): Observable<Prize[]> {
    return this.http.get<Prize[]>(
      this.userGetPrizeUrl + "/getPrizes/" + teamId + "/" + userId
    );
  }

  public addUserPrizes(userId: number, idPrize: number) {
    return this.http.get(
      this.userGetPrizeUrl + "/addUserPrizes/" + idPrize + "/" + userId
    );
  }

  public getTeamPrizes(teamId: number){
    return this.http.get<UserGetPrize[]>(
      this.userGetPrizeUrl + "/getPrizes/" + teamId
    );
  }
}
