import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from 'src/app/globalVariables/urlVariable';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = host + "/fileApi";
  }

  public uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      this.baseUrl + "/upload", formData);
  }

  public getFiles() {
    return this.http.get(
      this.baseUrl + "/files");
  }

  public getFile(id: string) {
    return this.http.get(
      this.baseUrl + "/fileUrl/" + id);
  }
}
