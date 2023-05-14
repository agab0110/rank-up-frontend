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
}
