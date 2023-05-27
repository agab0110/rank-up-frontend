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

    public changeUsername(teamId: number, username: string){
      return this.http.patch<User>(
        this.userUrl + "/changeUsername/" + teamId, username
      );
    }

  public changeName(userId: number, newName: string) {
    return this.http.patch<User>(
      this.userUrl + "/changeName/" + userId, newName
    );
  }

  public getUser(idUser: any) {
    return this.http.get(
      this.userUrl + "/getUser/" + idUser
    );
  }

  public changeEmail(userId: number, newEmail: string) {
    return this.http.patch<User>(
      this.userUrl + "/changeEmail/" + userId, newEmail
    );
  }

  public changePassword(userId: number, newPassword: string) {
    return this.http.patch<User>(
      this.userUrl + "/changePassword/" + userId, newPassword
    );
  }
}
