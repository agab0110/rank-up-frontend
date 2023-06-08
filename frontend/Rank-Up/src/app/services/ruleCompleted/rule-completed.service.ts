import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { host } from 'src/app/globalVariables/urlVariable';
import { RuleCompleted } from 'src/app/models/ruleCompleted/rule-completed';

@Injectable({
  providedIn: 'root'
})
export class RuleCompletedService {
  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = host + "/ruleCompletedApi";
  }

  public getRulesCompletedByUser(IdUser: number, idTeam: number) {
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
      this.baseUrl + "/ruleRejected/" + teamId
    );
  }

  public getRuleDelivered(id: any) {
    return this.http.get(this.baseUrl + "/request/" + id);
  }

  public getUserHistory(id: any, nome: any) {
    return this.http.get(this.baseUrl + "/history/" + id + "/" + nome);
  }

  public insertRuleCompleted(ruleCompleted: any) {
    return this.http.post(this.baseUrl + "/ruleCompleted", ruleCompleted);
  }

  public getPending(id_team: any) {
    return this.http.get(this.baseUrl + "/pending/" + id_team);
  }

  public getRulesCompleted(idRule: number) {
    return this.http.get<RuleCompleted>(this.baseUrl + "/admin/ruleCompletedDetails/" + idRule);
  }

  public ruleAcceptation(idRuleCompleted: Number, status: number, ruleCompleted: RuleCompleted) {
    return this.http.patch(
      this.baseUrl + "/acceptance/" + idRuleCompleted + "/" + status, ruleCompleted
    )
  }

  public acceptationActivity(idRuleCompleted: Number, comment: String, bonusPoints: Number, status: Number) {
    const requestParams = {
      'comment': comment,
      'bonusPoints': bonusPoints,
      'status': status,
    };
    return this.http.patch(this.baseUrl + "/acceptance/" + idRuleCompleted, requestParams).subscribe(response => {
      console.log(response);
    }, (error: Response) => {
      if (error.status == 400) {
        console.log("400 error");
      } else {
        console.log("Unexpected error");
      }
      console.log(error);
    });
  }
}



