import { Country } from '@angular-material-extensions/select-country';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/app/enums/agent.enum';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-player-update',
  templateUrl: './player-update.component.html',
  styleUrls: ['./player-update.component.css']
})
export class PlayerUpdateComponent implements OnInit {

  public teams: Team[] = [];
  public agents = Object.values(Agent).filter(x => typeof x === "string")

  selectedAgents: string[] = []

   public defaultValue: Country = {
     name: this.data.country,
     alpha2Code: '',
     alpha3Code: '',
     numericCode: '',
     callingCode: ''
   };

   public defaultTeam: Team = this.data.team;

  constructor(private teamService: TeamService, private playerService: PlayerService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  newPlayer = new FormGroup({
    gamertag: new FormControl(this.data.gamertag),
    name: new FormControl<string>(this.data.fullname),
    agents: new FormControl(this.data.agents),
    earnings: new FormControl<number>(this.data.earnings),
    team: new FormControl(this.defaultTeam),
    country: new FormControl<Country>(this.defaultValue),
  });

  ngOnInit(): void {
    this.teamService.list().subscribe(data => {
      this.teams = data;
      })
  }
  

  submit(): void {
    if (this.newPlayer.valid) {
      let gamertag = this.newPlayer.value.gamertag || ""
      let name = this.newPlayer.value.name || ""
      let earnings = this.newPlayer.value.earnings || 0
      let team = this.newPlayer.value.team || this.teams[0]
      let country = this.newPlayer.value.country || this.defaultValue

      let player: Player = {
        _id: this.data._id,
        gamertag: gamertag,
        country: country.name,
        picture: this.data.picture,
        fullname: name,
        earnings: earnings,
        agents: this.selectedAgents,
        team: team,
      }
      this.playerService.update(player).subscribe();
    
    }
  }

}
