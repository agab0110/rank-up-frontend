import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RuleCompleted } from 'src/app/models/ruleCompleted/rule-completed';

@Injectable({
  providedIn: 'root'
})
export class RuleCompletedService {
  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/ruleCompletedApi";
   }

   public ruleAccepted(teamId: Number): Observable<RuleCompleted[]> {
    return this.http.get<RuleCompleted[]>(
      this.baseUrl + "/ruleAccepted/" + teamId
    );
  }
  public rulerejected(teamId: Number): Observable<RuleCompleted[]> {
    return this.http.get<RuleCompleted[]>(
      this.baseUrl + "/rulerejected/" + teamId
    );
  }
}
