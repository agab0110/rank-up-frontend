import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminReciveNotificationService {

  adminReciveNotificationUrl: String;

  constructor(private http: HttpClient) { 
    this.adminReciveNotificationUrl = 'http://localhost:8080/adminReciveNotificationApi'
  }
}
