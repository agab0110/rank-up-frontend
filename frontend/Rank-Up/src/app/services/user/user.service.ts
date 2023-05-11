import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  public changePhoto(userId: number, photo: string) {
    return this.http.patch(this.userUrl + "/changePhoto" + "/" + userId, photo);
  }
}
