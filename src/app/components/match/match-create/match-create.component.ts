import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Map } from 'src/app/models/map.model';
import { Match } from 'src/app/models/match.model';
import { Team } from 'src/app/models/team.model';
import { MapService } from 'src/app/services/map.service';
import { MatchService } from 'src/app/services/match.service';
import { StorageService } from 'src/app/services/storage.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.css'],
})
export class MatchCreateComponent implements OnInit {
  public teams: Team[] = [];
  public maps: Map[] = [];
  private user: any;

  constructor(
    private teamService: TeamService,
    private mapService: MapService,
    private matchService: MatchService,
    private storageService: StorageService,
    private snackbar: MatSnackBar
  ) {}

  newMatch = new FormGroup({
    matchname: new FormControl<string>('', Validators.required),
    date: new FormControl<Date>(new Date(), Validators.required),
    map: new FormControl<Map>(this.maps[1], Validators.required),
    team1: new FormControl(this.teams[1], Validators.required),
    team2: new FormControl(this.teams[1], Validators.required),
    scoreteam1: new FormControl<number>(0, Validators.required),
    scoreteam2: new FormControl<number>(0, Validators.required),
  });

  ngOnInit(): void {
    this.teamService.list().subscribe((data) => {
      this.teams = data;
    });
    this.mapService.list().subscribe((data) => {
      this.maps = data;
    });
    this.user = this.storageService.getUser();
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
        _id: undefined,
        author: this.user.id,
        date: date,
        name: name,
        winner: winner,
        map: map,
        team1: team1,
        team2: team2,
        resultteam1: scoreteam1,
        resultteam2: scoreteam2,
      };
      this.matchService.create(match).subscribe(() => {
        this.snackbar.open(`Match successfully created`, '', {
          duration: 3000,
        });
      });
    } else {
    }
  }

  get matchname() {
    return this.newMatch.get('matchname');
  }

  get date() {
    return this.newMatch.get('date');
  }

  get map() {
    return this.newMatch.get('map')
  }

  get team1() {
    return this.newMatch.get('team1')
  }

  get team2() {
    return this.newMatch.get('team2')
  }

  get scoreteam1() {
    return this.newMatch.get('scoreteam1')
  }

  get scoreteam2() {
    return this.newMatch.get('scoreteam2')
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
