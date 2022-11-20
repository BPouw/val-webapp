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
  public player: Player | undefined;
  public agents = Object.values(Agent).filter(x => typeof x === "string")
  @Inject(MAT_DIALOG_DATA) public data: Player | undefined;

  selectedAgents: string[] = []

   public defaultValue: Country = {
    name: 'Deutschland',
    alpha2Code: 'DE',
    alpha3Code: 'DEU',
    numericCode: '276',
    callingCode: ''
  };

  constructor(private teamService: TeamService, private playerService: PlayerService) { }

  newPlayer = new FormGroup({
    gamertag: new FormControl('', {nonNullable: true}),
    name: new FormControl<string>('', Validators.required),
    agents: new FormControl(),
    earnings: new FormControl<number>(0),
    team: new FormControl(this.teams[1]),
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
        _id: undefined,
        gamertag: gamertag,
        country: country.name,
        picture: "",
        fullname: name,
        earnings: earnings,
        agents: this.selectedAgents,
        team: team,
      }
      console.log(this.selectedAgents);
      this.playerService.create(player).subscribe();
    
    }
  }

}
