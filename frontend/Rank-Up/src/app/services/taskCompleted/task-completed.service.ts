import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RuleCompleted } from 'src/app/models/ruleCompleted/rule-completed';
import { TaskCompleted } from 'src/app/models/taskCompleted/task-completed';

@Injectable({
  providedIn: 'root'
})
export class TaskCompletedService {

  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/taskCompletedApi";
  }

  public getTaskCompletedByUser(idUser: number, idTeam: number) {
    return this.http.get<TaskCompleted[]>(this.baseUrl + "/getTaskForSpecificUser/" + idTeam + "/" + idUser);
  }

  public taskAccepted(teamId: Number): Observable<TaskCompleted[]> {
    return this.http.get<TaskCompleted[]>(
      this.baseUrl + "/taskAccepted/" + teamId
    );
  }

  public taskRejected(teamId: Number): Observable<TaskCompleted[]> {
    return this.http.get<TaskCompleted[]>(
      this.baseUrl + "/taskRejected/" + teamId
    );
  }

  public getTaskDelivered(id: any) {
    return this.http.get(this.baseUrl + "/request/" + id);
  }

  public insertTaskCompleted(taskCompleted: any) {
    return this.http.post(this.baseUrl + "/taskCompleted", taskCompleted)
  }

  public confirmationTaskCompleted(id_task_completed: number, status: number ,ruleCompleted: RuleCompleted) {
    return this.http.patch(this.baseUrl + "/confirmation/" + id_task_completed + "/" + status, ruleCompleted)
  }

  public getPending(id_team: any) {
    return this.http.get(this.baseUrl + "/pending/" + id_team);
  }
}
