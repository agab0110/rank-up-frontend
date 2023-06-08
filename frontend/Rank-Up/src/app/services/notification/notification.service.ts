import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { host } from 'src/app/globalVariables/urlVariable';
import { Notification } from 'src/app/models/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.notificationUrl = host + "/notificationApi";
  }

  public newNotification(notification: Notification, idTeam: number) {
    return this.http.post<Notification>(
      this.notificationUrl + "/newNotification/" + idTeam, notification
    );
  }

  public getUserNotification(idNotification: Number): Observable<Notification> {
    return this.http.get<Notification>(
      this.notificationUrl + "/userNotification/" + idNotification
    );
  }

  public getUserNotifications(idUser: number) {
    return this.http.get(this.notificationUrl + "/getUserNotification/" + idUser);
  }

  public getAdminNotifications(idUser: number) {
    return this.http.get(this.notificationUrl + "/getAdminNotification/" + idUser);
  }

  public userNotificationDisplayed(idUser: number) {
    return this.http.get(this.notificationUrl + "/userNotificationDisplayed/" + idUser);
  }

  public adminNotificationDisplayed(idUser: number) {
    return this.http.get(this.notificationUrl + "/adminNotificationDisplayed/" + idUser);
  }

  public getUserDisplayed(idUser: number) {
    return this.http.get(this.notificationUrl + "/getUserDisplayed/" + idUser);
  }

  public getAdminDisplayed(idUser: number) {
    return this.http.get(this.notificationUrl + "/getAdminDisplayed/" + idUser);
  }
}
