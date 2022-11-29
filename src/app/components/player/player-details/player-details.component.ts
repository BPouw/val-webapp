import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { PlayerService } from 'src/app/services/player.service';
import { StorageService } from 'src/app/services/storage.service';
import { PlayerUpdateComponent } from '../player-update/player-update.component';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
})
export class PlayerDetailsComponent implements OnInit {
  player!: Player;
  team!: Team;
  agents: String[] = [];
  lowAgents: String[] = [];
  playerid?: string = '';
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.playerService.read(params['id']).subscribe((data) => {
        this.player = data;
        this.team = this.player.team;
        this.agents = this.player.agents;
        this.playerid = this.player._id;
        for (let agent of this.agents) {
          let lowagent = agent.toLowerCase();
          this.lowAgents.push(lowagent);
        }
      });
    });

    this.user = this.storageService.getUser();
  }

  teamDetails(team: Team): void {
    this.router.navigate(['teams', team._id]);
  }

  update(): void {
    const dialogRef = this.dialog.open(PlayerUpdateComponent, {
      data: this.player,
    });
  }

  delete(): void {
    this.playerid && this.playerService.delete(this.playerid).subscribe();
    this.router.navigate(['players']);
    this.snackbar.open(
      `Player ${this.player.gamertag} successfully deleted`,
      '',
      {
        duration: 3000,
      }
    );
  }
}
