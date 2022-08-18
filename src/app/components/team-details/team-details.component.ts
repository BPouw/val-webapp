import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  team!: Team
  players: Player[] = [];
  matches: Match[] = [];
  columnsToDisplay = ['date', 'matchname', 'map', 'teams', 'score', 'winner'];

  constructor(private teamService: TeamService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.teamService.read(params['id']).subscribe(data => {
        this.team = data;
        this.players = this.team.players
        this.matches = this.team.matches
        console.log(this.matches)
      })
    })
  }

  matchDetails(match: Match): void {
    this.router.navigate(["matches", match._id])
  }

  playerDetails(player: Player): void {
    this.router.navigate(["players", player._id])
  }

}
