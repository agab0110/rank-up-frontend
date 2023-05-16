import { HttpClient } from '@angular/common/http';
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

  public newRule(rule : Rule){
    return this.http.post<Rule>(
    this.baseUrl + "/createRule", rule
    );
  }
}
