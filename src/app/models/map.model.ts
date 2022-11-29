import { Entity } from './entity';
import { User } from './user.model';

export class Map extends Entity {
  name!: string;
  thumbnail!: string;
  is_active!: boolean;
  description!: string;
  author!: User;
}
