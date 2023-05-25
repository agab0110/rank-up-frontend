import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserReciveNotificationService {
  userReciveNotificationUrl: String;
  
  constructor(private http: HttpClient) { 
    this.userReciveNotificationUrl = 'http://localhost:8080/userReciveNotificationApi'
  }
}
