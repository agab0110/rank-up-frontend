import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/models/admin/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = "http://localhost:8080/adminManageTeamApi"
  }

  public newAdmin(id_team: Number, id_user: Number) {
    return this.http.post<Admin[]>(
      this.baseUrl + "/addAdmin", id_user
    );
  }
}
