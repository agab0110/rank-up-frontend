import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule } from 'src/app/models/rule/rule';
import { RuleCompleted } from 'src/app/models/ruleCompleted/rule-completed';

@Injectable({
  providedIn: 'root'
})
export class RuleCompletedService {
  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/ruleCompletedApi";
  }

  public getRulesCompletedByUser(idTeam: number, IdUser: number): Observable<Rule[]> {
    return this.http.get<Rule[]>(this.baseUrl + "/getRuleForSpecificUser/" + idTeam + "/" + IdUser);
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

    public ruleAcceptation(idRuleCompleted: Number, comment: string, bonusPoints: Number, status: Number) {
      const requestParams = new HttpParams()
        .set('comment', comment)
        .set('bonusPoints', bonusPoints.toString())
        .set('status', status.toString())

        return this.http.patch(this.baseUrl + "/acceptance/" + idRuleCompleted, {requestParams}).subscribe(response => {
        console.log(response);
      }, (error: Response) => {
        if(error.status == 400) {
          console.log("400 error");
        } else {
          console.log("Unexpected error");
        }
        console.log(error);
      });
    }
  }



