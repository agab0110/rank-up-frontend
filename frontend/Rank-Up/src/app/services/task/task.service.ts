import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/taskApi";
  }

  public listTask(teamId: Number): Observable<Task[]> {
    return this.http.get<Task[]>(
      this.baseUrl + "/tasks/" + teamId
    );
  }

  public addTask( task: Task){
    return this.http.post<Task>(
      this.baseUrl + "add/task", task
    );
  }
}
