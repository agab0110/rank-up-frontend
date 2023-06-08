import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { host } from 'src/app/globalVariables/urlVariable';
import { UserReciveNotification } from 'src/app/models/userReciveNotification/user-recive-notification';

@Injectable({
  providedIn: 'root'
})
export class UserReciveNotificationService {
  userReciveNotificationUrl: String;
  
  constructor(private http: HttpClient) { 
    this.userReciveNotificationUrl = host + "/userReciveNotificationApi";
  }

  public getNotification(idUser: Number): Observable<UserReciveNotification[]> {
    return this.http.get<UserReciveNotification[]>(
      this.userReciveNotificationUrl + "/getNotification/" + idUser
    );
  }

  public addNotification(idUser: number, idNotification: number){
    return this.http.post<UserReciveNotification>(
      this.userReciveNotificationUrl + "/newNotification/" + idUser + "/" + idNotification, null
    )
  }
}
