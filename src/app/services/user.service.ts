import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/services/base.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { GameeResponse } from '../base/models/gameeResponse';

@Injectable()
export class UserService extends BaseService<User, number> {
  constructor(http: HttpClient) {
    super(http, "user");
  }

  public login(user: User): Observable<GameeResponse<User>> {
    return this.httpClient.post<GameeResponse<User>>(`${this.apiUrl}/login`, user);
  }
}