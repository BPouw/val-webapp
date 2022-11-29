import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Map } from 'src/app/models/map.model';
import { Match } from 'src/app/models/match.model';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { MatchService } from 'src/app/services/match.service';
import { StorageService } from 'src/app/services/storage.service';
import { TeamService } from 'src/app/services/team.service';
import { MatchUpdateComponent } from '../match-update/match-update.component';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css'],
})
export class MatchDetailsComponent implements OnInit {
  matchId!: string;
  match!: Match;
  playersteam1: Player[] = [];
  playersteam2: Player[] = [];
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService,
    private teamService: TeamService,
    private router: Router,
    private storageService: StorageService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.matchId = params['id'];
      this.getMatchDetails(this.matchId);
    });
    this.user = this.storageService.getUser();
  }

  getMatchDetails(matchId: string): void {
    this.matchService.read(matchId).subscribe((data) => {
      this.match = data;

      this.match.team1._id &&
        this.teamService.getPlayers(this.match.team1._id).subscribe((data) => {
          this.playersteam1 = data;
        });
      this.match.team2._id &&
        this.teamService.getPlayers(this.match.team2._id).subscribe((data) => {
          this.playersteam2 = data;
        });
    });
  }

  teamDetails(team: Team): void {
    this.router.navigate(['teams', team._id]);
  }

  playerDetails(player: Player) {
    this.router.navigate(['players', player._id]);
  }

  mapDetails(map: Map): void {
    this.router.navigate(['maps', map._id]);
  }

  update(): void {
    const dialogRef = this.dialog.open(MatchUpdateComponent, {
      data: this.match,
    });
  }

  delete(): void {
    this.match._id && this.matchService.delete(this.match._id).subscribe();
    this.router.navigate(['matches']);
    this.snackbar.open(`Match ${this.match.name} successfully deleted`, '', {
      duration: 3000,
    });
  }
}
