
import { Entity } from "./entity";
import { Team } from "./team.model";

export class Match extends Entity {
    name!: string
    winner!: Team
    date?: Date
    map!: string
    team1!: Team
    team2!: Team
    resultteam1?: number
    resultteam2?: number
}