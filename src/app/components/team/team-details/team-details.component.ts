import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { StorageService } from 'src/app/services/storage.service';
import { TeamService } from 'src/app/services/team.service';
import { TeamUpdateComponent } from '../team-update/team-update.component';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit {
  team!: Team;
  players: Player[] = [];
  matches: Match[] = [];
  columnsToDisplay = ['date', 'matchname', 'map', 'teams', 'score', 'winner'];
  user: any;
  teamid?: string = '';

  constructor(
    private teamService: TeamService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.teamService.read(params['id']).subscribe((data) => {
        this.team = data;
        this.teamid = this.team._id;
      });
      this.teamService.getPlayers(params['id']).subscribe((data) => {
        this.players = data;
        console.log(data);
      });
      this.teamService.getMatches(params['id']).subscribe((data) => {
        this.matches = data;
      });
    });
    this.user = this.storageService.getUser();
  }

  matchDetails(match: Match): void {
    this.router.navigate(['matches', match._id]);
  }

  playerDetails(player: Player): void {
    this.router.navigate(['players', player._id]);
  }

  update(): void {
    const dialogRef = this.dialog.open(TeamUpdateComponent, {
      data: this.team,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
      this.snackbar.open(`Team successfully updated`, '', {
        duration: 3000,
      });
    });
  }

  delete(): void {
    this.teamid && this.teamService.delete(this.teamid).subscribe();
    this.router.navigate(['teams']);
    this.snackbar.open(`Team ${this.team.teamname} successfully deleted`, '', {
      duration: 3000,
    });
  }
}
