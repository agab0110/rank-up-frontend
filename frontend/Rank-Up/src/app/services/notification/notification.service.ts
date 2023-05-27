import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.notificationUrl = "http://localhost:8080/notificationApi/";
  }

  public newNotification(notification: Notification, idTeam: number) {
    return this.http.post<Notification>(
      this.notificationUrl + "newNotification/" + idTeam, notification
    );
  }

  public getUserNotification(idNotification: Number): Observable<Notification> {
    return this.http.get<Notification>(
      this.notificationUrl + "/userNotification/" + idNotification
    );
  }
}
