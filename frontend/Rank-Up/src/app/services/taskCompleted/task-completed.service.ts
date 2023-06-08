import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { host } from 'src/app/globalVariables/urlVariable';
import { RuleCompleted } from 'src/app/models/ruleCompleted/rule-completed';
import { Task } from 'src/app/models/task/task';
import { TaskCompleted } from 'src/app/models/taskCompleted/task-completed';

@Injectable({
  providedIn: 'root'
})
export class TaskCompletedService {

  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = host + "/taskCompletedApi";
  }

  public getTaskCompletedByUser(idUser: number, idTeam: number): Observable<TaskCompleted[]> {
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

  public confirmationTaskCompleted(idTaskCompleted: number, status: number , taskCompleted: TaskCompleted) {
    return this.http.patch(this.baseUrl + "/confirmation/" + idTaskCompleted + "/" + status, taskCompleted)
  }

  public getPending(id_team: any) {
    return this.http.get(this.baseUrl + "/pending/" + id_team);
  }

  public getTaskCompleted(idTask: number) {
    return this.http.get<TaskCompleted>(this.baseUrl + "/taskCompletedDetails/" + idTask);
  }
}
