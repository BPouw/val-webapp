import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  matchId!: string;
  match!: Match;
  playersteam1: Player[] = [];
  playersteam2: Player[] = [];

  constructor(private activatedRoute: ActivatedRoute, private matchService: MatchService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.matchId = params['id'];
      this.getMatchDetails(this.matchId);
    })
  }

  getMatchDetails(matchId: string): void {
    this.matchService.read(matchId).subscribe(data => {
      this.match = data;
      this.playersteam1 = this.match.team1.players ;
      this.playersteam2 = this.match.team2.players;
    })
  }

  teamDetails(team: Team): void {
    this.router.navigate(["teams", team._id])
  }
  

}

