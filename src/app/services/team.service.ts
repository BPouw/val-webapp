import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Team } from '../models/team.model';
import { EntityService } from './entity.service';

@Injectable({ providedIn: 'root' })
export class TeamService extends EntityService<Team>
{
	constructor (http: HttpClient)
    {
        super(http, environment.api, "teams")
    }   
}