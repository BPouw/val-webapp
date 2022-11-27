import { Entity } from "./entity";
import { Team } from "./team.model";
import { User } from "./user.model";

export class Player extends Entity {
    gamertag!: string
    fullname!: string
    picture!: string
    earnings!: number
    country!: string
    team!: Team
    agents!: string[]
    author: User | undefined
}