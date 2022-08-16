import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  matchId!: string;
  match!: Match;

  constructor(private activatedRoute: ActivatedRoute, private matchService: MatchService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.matchId = params['id'];
      this.getMatchDetails(this.matchId);
    })
  }

  getMatchDetails(matchId: string): void {
    this.matchService.read(matchId).subscribe(data => {
      this.match = data;
    })
  }
  

}

