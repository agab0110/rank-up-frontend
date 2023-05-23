import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prize } from 'src/app/models/prize/prize';

@Injectable({
  providedIn: 'root'
})
export class UserGetPrizeService {
  private userGetPrizeUrl: string;

  constructor(private http: HttpClient) {
    this.userGetPrizeUrl = 'http://localhost:8080/userGetPrizeApi'
  }

  public getUserPrizes(userId: number, teamId: number): Observable<Prize[]> {
    return this.http.get<Prize[]>(
      this.userGetPrizeUrl + "/getPrizes/" + teamId + "/" + userId
    );
  }
}
