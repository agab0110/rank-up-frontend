import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskCompleted } from 'src/app/models/taskCompleted/task-completed';

@Injectable({
  providedIn: 'root'
})
export class TaskCompletedService {

  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/taskCompletedApi";
  }

  public taskAccepted(teamId: Number): Observable<TaskCompleted[]> {
    return this.http.get<TaskCompleted[]>(
      this.baseUrl + "/taskAccepted/" + teamId
    );
  }

  public taskRejected(teamId: Number): Observable<TaskCompleted[]> {
    return this.http.get<TaskCompleted[]>(
      this.baseUrl + "/taskrejected/" + teamId
    );
  }

  public getTaskDelivered(id: any) {
    return this.http.get(this.baseUrl + "/request/" + id);
  }

  public insertTaskCompleted(taskCompleted: any) {
    return this.http.post(this.baseUrl + "/taskCompleted", taskCompleted)
  }

  public confirmationTaskCompleted(id_task_completed:any, status:any, comment: any) {
    return this.http.patch(this.baseUrl + "/confirmation/" + id_task_completed + "/" + status, comment)
  }

  public getPending(id_team: any) {
    return this.http.get(this.baseUrl + "/pending/" + id_team);
  }
}
