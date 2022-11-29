import { Entity } from './entity';
import { Match } from './match.model';
import { Player } from './player.model';
import { Tournament } from './tournament.model';
import { User } from './user.model';

export class Team extends Entity {
  teamname!: string;
  country!: string;
  ranking!: number;
  logo!: string;
  players!: Player[];
  matches!: Match[];
  tournaments!: Tournament[];
  author: User | undefined;
}
