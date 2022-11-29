import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';
import { StorageService } from 'src/app/services/storage.service';
import { TeamService } from 'src/app/services/team.service';
import { TeamCreateComponent } from '../team-create/team-create.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  columnsToDisplay = ['logo'];
  isLoggedIn: boolean = false;

  constructor(
    private teamService: TeamService,
    private router: Router,
    private storageService: StorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamService.list().subscribe((data) => {
      this.teams = data;
    });
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  teamDetails(team: Team): void {
    this.router.navigate(['teams', team._id]);
  }

  createTeam(): void {
    const dialogRef = this.dialog.open(TeamCreateComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.teamService.list().subscribe((data) => {
        this.teams = data;
      });
    });
  }
}
