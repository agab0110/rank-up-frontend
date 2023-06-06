import { HttpClient, HttpParams } from '@angular/common/http';
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

   public newPrize(prize: Prize, name:string ) {
    const params = new HttpParams().set('name', name);
    return this.http.post<Prize>(
    this.baseUrl + "/createPrize", prize,{params});
  }

  public removePrize(idTeam: number, idPrize: number) {
    return this.http.delete<Prize>(this.baseUrl + "/removePrize/" + idTeam + "/" + idPrize);
  }

  
}
