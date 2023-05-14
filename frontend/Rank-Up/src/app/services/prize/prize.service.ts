import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prize } from 'src/app/models/prize/prize';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  private baseUrl : String;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/prizeApi";
   }

   public newPrize(prize: Prize) {
    return this.http.post<Prize>(
    this.baseUrl + "/createPrize", prize);
   }
}
