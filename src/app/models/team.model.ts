import { Entity } from './entity';
import { Match } from './match.model';
import { Player } from './player.model';
import { User } from './user.model';

export class Team extends Entity {
  teamname!: string;
  country!: string;
  ranking!: number;
  logo!: string;
  author!: User;
}
