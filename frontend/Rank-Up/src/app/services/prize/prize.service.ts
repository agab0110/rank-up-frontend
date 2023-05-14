import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prize } from 'src/app/models/prize/prize';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/prizeApi";
  }
  public listPrize(teamId: Number): Observable<Prize[]> {
    return this.http.get<Prize[]>(
      this.baseUrl + "/prize/" + teamId
    );
  }
}
