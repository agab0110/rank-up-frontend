import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminReciveNotification } from 'src/app/models/adminReciveNotification/admin-recive-notification';

@Injectable({
  providedIn: 'root'
})
export class AdminReciveNotificationService {

  adminReciveNotificationUrl: String;

  constructor(private http: HttpClient) {
    this.adminReciveNotificationUrl = 'http://localhost:8080/adminReciveNotificationApi'
  }

  public getAdminNotification(idAdmin: Number): Observable<AdminReciveNotification[]> {
    return this.http.get<AdminReciveNotification[]>(
      this.adminReciveNotificationUrl + "/getAdminNotification/" + idAdmin
    );
  }
}
