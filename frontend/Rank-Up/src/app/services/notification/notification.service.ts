import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification/notification';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/notificationApi";
  }

  public getUserNotifications(idUser: Number): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      this.baseUrl + "/getUserNotification/" + idUser
    );
  }

  public getUserNotification(idNotification: Number): Observable<Notification> {
    return this.http.get<Notification>(
      this.baseUrl + "/userNotification/" + idNotification
    )
  }
}
