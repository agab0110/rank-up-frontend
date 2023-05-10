import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessRequest } from 'src/app/models/accessRequest/access-request';

@Injectable({
  providedIn: 'root'
})
export class AccessRequestService {
  private accessRequestUrl: string;
  status!: string;

  constructor(private http: HttpClient) {
    this.accessRequestUrl = 'http://localhost:8080/accessRequestApi'
  }

  deleteRequest(accessRequest: AccessRequest) {
    this.http.delete(
      this.accessRequestUrl + "/deleteRequest"
    ).subscribe(() => this.status = 'Delete successful');
  }
}
