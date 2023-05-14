import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskCompletedService {

  taskCompletedUrl: String;

  constructor(private http: HttpClient) { 
    this.taskCompletedUrl = 'http://localhost:8080/taskCompletedApi'
  }

  public getTaskDelivered(id: any) {
    return this.http.get(this.taskCompletedUrl + "/request/" + id);
  }
}
