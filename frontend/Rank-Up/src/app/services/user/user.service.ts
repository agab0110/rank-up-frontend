import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { host } from 'src/app/globalVariables/urlVariable';
import { User } from 'src/app/models/user/user';

@Injectable()
export class UserService {
  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = host + "/userApi";
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

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.userUrl + "/getAllUsers"
    );
  }

  public changeUsername(teamId: number, username: string) {
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

  public changePhoto(userId: number, newPhoto: string) {
    return this.http.patch<User>(
      this.userUrl + "/changePhoto/" + userId, newPhoto
    );
  }

  public getNewUsers(idTeam: number) {
    return this.http.get(this.userUrl + "/getNewUsers/" + idTeam);
  }
}
