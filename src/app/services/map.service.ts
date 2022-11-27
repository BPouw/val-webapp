import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Map } from '../models/map.model';
import { EntityService } from './entity.service';

@Injectable({ providedIn: 'root' })
export class MapService extends EntityService<Map>
{
	constructor (http: HttpClient)
    {
        super(http, environment.api, "maps")
    }   
}