import { Entity } from "./entity";
import { Match } from "./match.model";
import { Player } from "./player.model";
import { Tournament } from "./tournament.model";

export class Team extends Entity {
    teamname!: string
    country!: string
    ranking!: number
    players!: Player[]
    matches!: Match[]
    tournaments!: Tournament[]
}