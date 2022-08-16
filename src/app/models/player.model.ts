import { Entity } from "./entity";
import { Team } from "./team.model";

export class Player extends Entity {
    gamertag!: string
    fullname!: string
    picture!: string
    earnings!: number
    country!: string
    team!: Team
    agents!: string[]
}