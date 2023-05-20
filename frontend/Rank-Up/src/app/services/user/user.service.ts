import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';

@Injectable()
export class UserService {
  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/userApi'
  }

  public save(user: User) {
    return this.http.post<User>(
      this.userUrl + "/signUp", user
    );
  }

  public login(user: User) {
    return this.http.post<User>(
      this.userUrl + "/login", user
    );
  }

  public getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(
      this.userUrl + "/getAllUsers"
    );
  }

  public getUser(idUser: any) {
    return this.http.get(
      this.userUrl + "/getUser/" + idUser
    );
  }
}
