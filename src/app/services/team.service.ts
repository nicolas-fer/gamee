import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { GameeResponse } from '../base/models/gameeResponse';
import { BaseService } from '../base/services/base.service';

@Injectable()
export class TeamService extends BaseService<Team, number> {
  constructor(http: HttpClient) {
    super(http, "team");
  }
}