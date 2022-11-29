import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Team } from '../models/team.model';
import { EntityService } from './entity.service';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { Match } from '../models/match.model';

@Injectable({ providedIn: 'root' })
export class TeamService extends EntityService<Team> {
  constructor(http: HttpClient) {
    super(http, environment.api, 'teams');
  }

  getPlayers(teamid: number | string): Observable<Player[]> {
    return this.http.get<Player[]>(
      environment.api + '/teams/' + teamid + '/players'
    );
  }

  getMatches(teamid: number | string): Observable<Match[]> {
    return this.http.get<Match[]>(
      environment.api + '/teams/' + teamid + '/matches'
    );
  }
}
