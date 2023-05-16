import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    const url = `${this.baseUrl}/addAdmin/${id_team}/${id_user}`;
    return this.http.post<Admin[]>(url, id_user);
  }
}
