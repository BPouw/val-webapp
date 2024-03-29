import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerCreateComponent } from '../player-create/player-create.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  columns: number = 5;
  isLoggedIn = false;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.playerService.list().subscribe((data) => {
      this.players = data;
    });
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  ngAfterViewInit() {
    this.breakpointObserver
      .observe(['(max-width: 1800px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.columns = 3;
        } else {
          this.columns = 5;
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.columns = 1;
        } else {
          this.columns = 3;
        }
      });
  }

  playerDetails(player: Player): void {
    this.router.navigate(['players', player._id]);
  }

  createPlayer() {
    const dialogRef = this.dialog.open(PlayerCreateComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.playerService.list().subscribe((data) => {
        this.players = data;
      });
    });
  }
}
