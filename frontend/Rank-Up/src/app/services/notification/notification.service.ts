import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl: String;

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/notificationApi";
  }

  public getUserNotification(idUser: number) {
    return this.http.get(this.baseUrl + "/getUserNotification/" + idUser);
  }

  public getAdminNotification(idUser: number) {
    return this.http.get(this.baseUrl + "/getAdminNotification/" + idUser);
  }
}
