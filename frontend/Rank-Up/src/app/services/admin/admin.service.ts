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

  public newAdmin(idUser:number, idTeam: number) {
    const param = new HttpParams().set('idUser',idUser).set('idTeam',idTeam);
    return this.http.post<Admin>(
      this.baseUrl + "/addAdmin " ,{param}
    );
  }
}
