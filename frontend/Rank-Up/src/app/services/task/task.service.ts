import { HttpClient, HttpParams } from '@angular/common/http';
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


  public userTasks(teamId: number, idUser: number): Observable<Task[]> {
    return this.http.get<Task[]>(
      this.baseUrl + "/userTasks/" + teamId + "/" + idUser
    );
  }


  public getTask(idTask: any) {
    return this.http.get(
      this.baseUrl + "/task/" + idTask
      );
  }

  public newTask(task: Task,name:string) {
    const params = new HttpParams().set('name', name);
    return this.http.post<Task>(
      this.baseUrl + "/createTask", task, {params}
      );
  }
}
