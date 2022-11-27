import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data, Router} from '@angular/router'
import { Match } from 'src/app/models/match.model';
import { Player } from 'src/app/models/player.model';
import { MatchService} from 'src/app/services/match.service'
import { StorageService } from 'src/app/services/storage.service';
import { MatchCreateComponent } from '../match-create/match-create.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})

export class MatchesComponent implements OnInit {

  public matches: Match[] = []
  public columnsToDisplay = ['date', 'matchname', 'map', 'teams', 'score', 'winner']
  public isLoggedIn: boolean = false;

  constructor(private matchService: MatchService, private router: Router, private storageService: StorageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.matchService.list().subscribe(data => {
      this.matches = data;
    })
    this.isLoggedIn = this.storageService.isLoggedIn();

  }

  matchDetails(match: Match) {
    this.router.navigate(['matches', match._id])
  }

  createMatch(): void {
    const dialogRef = this.dialog.open(MatchCreateComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.matchService.list().subscribe(data => {
        this.matches = data;
      })
    })
  }
}