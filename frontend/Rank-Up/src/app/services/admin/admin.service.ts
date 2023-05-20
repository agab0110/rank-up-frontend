import { HttpClient, HttpParams } from '@angular/common/http';
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

  public newAdmin(id_user:number, id_team: number) {
    const param = new HttpParams();
    param.append('id_user',id_user);
    param.append('id_team',id_team);

    return this.http.post<Admin>(
      this.baseUrl + "/addAdmin " ,{param}
    );
  }
}
