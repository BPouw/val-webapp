import { Entity } from './entity';
import { Match } from './match.model';
import { Team } from './team.model';

export class Tournament extends Entity {
  name!: string;
  startdate!: Date;
  enddate!: Date;
  prize!: string;
  region!: string;
  teams!: Team[];
  matches!: Match[];
}
