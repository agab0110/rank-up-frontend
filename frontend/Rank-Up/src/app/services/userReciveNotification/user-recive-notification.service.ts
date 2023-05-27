import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserReciveNotification } from 'src/app/models/userReciveNotification/user-recive-notification';

@Injectable({
  providedIn: 'root'
})
export class UserReciveNotificationService {
  userReciveNotificationUrl: String;
  
  constructor(private http: HttpClient) { 
    this.userReciveNotificationUrl = 'http://localhost:8080/userReciveNotificationApi'
  }

  public getNotification(idUser: Number): Observable<UserReciveNotification[]> {
    return this.http.get<UserReciveNotification[]>(
      this.userReciveNotificationUrl + "/getNotification/" + idUser
    );
  }
}
