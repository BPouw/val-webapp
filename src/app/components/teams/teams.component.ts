import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];
  columnsToDisplay = ['logo']

  constructor(private teamService: TeamService, private router: Router) { }

  ngOnInit(): void {
    this.teamService.list().subscribe(data => {
      this.teams = data;
      console.log(this.teams)
    })
  }

  teamDetails(team: Team): void {
    this.router.navigate(["teams", team._id])
  }

}
