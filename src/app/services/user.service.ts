import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Match } from '../models/match.model';
import { Team } from '../models/team.model';
import { Player } from '../models/player.model';
import { Map } from '../models/map.model';
import { createUrlTreeFromSnapshot } from '@angular/router';

const httpOptions = {
  observe: 'body',
  responseType: 'json',
};


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}



  getUser(userid: number | string): Observable<User> {
    return this.http.get<User>(
      environment.api + 'users/' + userid
    );
  }

  getUserMatches(userid: number | string): Observable<Match[]> {
    return this.http.get<Match[]>(
      environment.api + 'users/' + userid + '/matches'
    );
  }

  getUserTeams(userid: number | string): Observable<Team[]> {
    return this.http.get<Team[]>(
      environment.api + 'users/' + userid + '/teams'
    );
  }

  getUserPlayers(userid: number | string): Observable<Player[]> {
    return this.http.get<Player[]>(
      environment.api + 'users/' + userid + '/players'
    );
  }

  getUserMaps(userid: number | string): Observable<Map[]> {
    return this.http.get<Map[]>(
      environment.api + 'users/' + userid + '/maps'
    );
  }

  follow(userid: string, currentUser: string, options?: any): Observable<any> {

    const payload = {
      "followUser": userid
    };

    return this.http.post<any>(environment.api + 'users/' + currentUser + '/follow', payload,{ ...options, ...httpOptions } )
  }

  unfollow(userid: string, currentUser: string, options?: any): Observable<any> {

    const payload = {
      "unfollowUser": userid
    };

    return this.http.post(environment.api + 'users/' + currentUser + '/unfollow', payload, { ...options, ...httpOptions })
  }

  followers(userid: string): Observable<any> {
    return this.http.get(environment.api + 'users/' + userid + '/followers')
  }

  following(userid: string): Observable<any> {
    return this.http.get(environment.api + 'users/' + userid + '/following')
  }
}
