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

  public getRulesCompletedByUser(idTeam: number, IdUser: number) {
    return this.http.get<RuleCompleted[]>(this.baseUrl + "/getRuleForSpecificUser/" + idTeam + "/" + IdUser);
  }

   public getRuleCompleted(idRule: number) {
    return this.http.get<RuleCompleted>(this.baseUrl + "/user/ruleCompletedDetails/" + idRule);
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

  public getRuleDelivered(id: any) {
    return this.http.get(this.baseUrl + "/request/" + id);
  }

  public getUserHistory(id: any, nome: any) {
    return this.http.get(this.baseUrl + "/history/" + id + "/" + nome);
  }
}
