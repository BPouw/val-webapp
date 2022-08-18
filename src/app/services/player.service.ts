import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


import { EntityService } from './entity.service';
import { Player } from '../models/player.model';

@Injectable({ providedIn: 'root' })
export class PlayerService extends EntityService<Player>
{
	constructor (http: HttpClient)
    {
        super(http, environment.api, "players")
    }   
}