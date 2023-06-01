import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule } from 'src/app/models/rule/rule';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/ruleApi";
  }

  public listRule(teamId: Number): Observable<Rule[]> {
    return this.http.get<Rule[]>(
      this.baseUrl + "/rules/" + teamId
    );
  }

  public newRule(rule: Rule,name:string) {
    const params = new HttpParams().set('name', name);
    return this.http.post<Rule>(
      this.baseUrl + "/createRule", rule, {params}
    );
  }

  public getRule(idRule: any) {
    return this.http.get<Rule>(
      this.baseUrl + "/rule/" + idRule
    );
  }
}
