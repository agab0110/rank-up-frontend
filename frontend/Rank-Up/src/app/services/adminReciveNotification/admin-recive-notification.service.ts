import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminReciveNotification } from 'src/app/models/adminReciveNotification/admin-recive-notification';

@Injectable({
  providedIn: 'root'
})
export class AdminReciveNotificationService {

  adminReciveNotificationUrl: String;

  constructor(private http: HttpClient) { 
    this.adminReciveNotificationUrl = 'http://localhost:8080/adminReciveNotificationApi'
  }

  public addNotification(idAdmin: number, idNotification: number) {
    return this.http.post<AdminReciveNotification>(
      this.adminReciveNotificationUrl + "/newNotification/" + idAdmin + "/" + idNotification, null
    );
  }
}
