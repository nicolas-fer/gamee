import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team';
import { BaseService } from '../base/services/base.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TeamService extends BaseService<Team, number> {
  constructor(http: HttpClient, localSotarageService: LocalStorageService) {
    super(localSotarageService, http, "team");
  }
}