import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RuleCompletedService {

  ruleCompletedUrl: String;

  constructor(private http: HttpClient) { 
    this.ruleCompletedUrl = 'http://localhost:8080/ruleCompletedApi'
  }

  public getRuleDelivered(id: any) {
    return this.http.get(this.ruleCompletedUrl + "/request/" + id);
  }

  public getUserHistory(id: any, nome: any) {
    return this.http.get(this.ruleCompletedUrl + "/history/" + id + "/" + nome);
  }
}
