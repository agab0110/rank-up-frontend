import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationUrl:  String;

  constructor(private http: HttpClient) {
    this.notificationUrl = "http://localhost:8080/notificationApi";
  }

  public getNotification(idUser: Number): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      this.notificationUrl + "/getNotification/" + idUser
    );
  }

}
