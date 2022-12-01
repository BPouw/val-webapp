import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Map } from 'src/app/models/map.model';
import { Match } from 'src/app/models/match.model';
import { Team } from 'src/app/models/team.model';
import { MapService } from 'src/app/services/map.service';
import { MatchService } from 'src/app/services/match.service';
import { StorageService } from 'src/app/services/storage.service';
import { TeamService } from 'src/app/services/team.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-match-update',
  templateUrl: './match-update.component.html',
  styleUrls: ['./match-update.component.css'],
})
export class MatchUpdateComponent implements OnInit {
  public teams: Team[] = [];
  public maps: Map[] = [];
  private user: any;

  public map!: Map;

  constructor(
    private teamService: TeamService,
    private mapService: MapService,
    private matchService: MatchService,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.map = this.data.map;
  }

  newMatch = new FormGroup({
    matchname: new FormControl<string>(this.data.name),
    date: new FormControl<Date>(this.data.date),
    map: new FormControl<Map>(this.data.map._id),
    team1: new FormControl(this.data.team1._id),
    team2: new FormControl(this.data.team2._id),
    scoreteam1: new FormControl<number>(this.data.resultteam1),
    scoreteam2: new FormControl<number>(this.data.resultteam2),
  });

  ngOnInit(): void {
    this.teamService.list().subscribe((data) => {
      this.teams = data;
    });
    this.mapService.list().subscribe((data) => {
      this.maps = data;
    });
    this.user = this.storageService.getUser();
    console.log(this.data);
  }

  submit(): void {
    if (this.newMatch.valid) {
      let name = this.newMatch.value.matchname || '';
      let date = this.newMatch.value.date || new Date();
      let map = this.newMatch.value.map || this.maps[0];
      let team1 = this.newMatch.value.team1 || this.teams[0];
      let team2 = this.newMatch.value.team2 || this.teams[0];
      let scoreteam1 = this.newMatch.value.scoreteam1 || 0;
      let scoreteam2 = this.newMatch.value.scoreteam2 || 0;

      let winner = this.calculateWinner(scoreteam1, scoreteam2, team1, team2);

      let match: Match = {
        _id: this.data._id,
        author: this.data.author._id,
        date: date,
        name: name,
        winner: winner,
        map: map,
        team1: team1,
        team2: team2,
        resultteam1: scoreteam1,
        resultteam2: scoreteam2,
      };
      this.matchService.update(match).subscribe();
    }
  }

  calculateWinner(
    scoreteam1: number,
    scoreteam2: number,
    team1: Team,
    team2: Team
  ): Team {
    if (scoreteam1 > scoreteam2) {
      return team1;
    } else {
      return team2;
    }
  }

}
