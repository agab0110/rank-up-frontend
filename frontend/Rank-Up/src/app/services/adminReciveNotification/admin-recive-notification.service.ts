import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { host } from 'src/app/globalVariables/urlVariable';
import { AdminReciveNotification } from 'src/app/models/adminReciveNotification/admin-recive-notification';

@Injectable({
  providedIn: 'root'
})
export class AdminReciveNotificationService {

  adminReciveNotificationUrl: String;

  constructor(private http: HttpClient) {
    this.adminReciveNotificationUrl = host + '/adminReciveNotificationApi'
  }

  public getAdminNotification(idAdmin: Number): Observable<AdminReciveNotification[]> {
    return this.http.get<AdminReciveNotification[]>(
      this.adminReciveNotificationUrl + "/getAdminNotification/" + idAdmin);
  }
  
  public addNotification(idAdmin: number, idNotification: number) {
    return this.http.post<AdminReciveNotification>(
      this.adminReciveNotificationUrl + "/newNotification/" + idAdmin + "/" + idNotification, null
    );
  }
}
