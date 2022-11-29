import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Match } from '../models/match.model';
import { EntityService } from './entity.service';

@Injectable({ providedIn: 'root' })
export class MatchService extends EntityService<Match> {
  constructor(http: HttpClient) {
    super(http, environment.api, 'matches');
  }
}
