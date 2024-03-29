import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Agent } from 'src/app/enums/agent.enum';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';
import { Country } from '@angular-material-extensions/select-country';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css'],
})
export class PlayerCreateComponent implements OnInit {
  public teams: Team[] = [];
  public agents = Object.values(Agent);
  private user: any;

  selectedAgents: string[] = [];

  public defaultValue: Country = {
    name: 'Germany',
    alpha2Code: 'DE',
    alpha3Code: 'DEU',
    numericCode: '276',
    callingCode: '',
  };

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService,
    private http: HttpClient,
    private storageService: StorageService,
    private snackbar: MatSnackBar
  ) {}

  newPlayer = new FormGroup({
    gamertag: new FormControl('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    agents: new FormControl(Validators.required),
    earnings: new FormControl<number>(0, Validators.required),
    team: new FormControl(this.teams[1], Validators.required),
    country: new FormControl<Country>(this.defaultValue, Validators.required),
  });

  ngOnInit(): void {
    this.teamService.list().subscribe((data) => {
      this.teams = data;
    });
    this.user = this.storageService.getUser();
  }

  submit(): void {
    if (this.newPlayer.valid) {
      let gamertag = this.newPlayer.value.gamertag || '';
      let name = this.newPlayer.value.name || '';
      let earnings = this.newPlayer.value.earnings || 0;
      let team = this.newPlayer.value.team || this.teams[0];
      let country = this.newPlayer.value.country || this.defaultValue;

      let player: Player = {
        _id: undefined,
        gamertag: gamertag,
        country: country.name,
        picture: 'https://www.vlr.gg/img/base/ph/sil.png',
        fullname: name,
        earnings: earnings,
        agents: this.selectedAgents,
        team: team,
        author: this.user.id,
      };
      this.playerService.create(player).subscribe(() => {
        this.snackbar.open(`Player successfully created`, '', {
          duration: 3000,
        });
      });
    }
  }

  get gamertag() {
    return this.newPlayer.get('gamertag')
  }

  get country() {
    return this.newPlayer.get('country')
  }

  get name() {
    return this.newPlayer.get('name')
  }

  get earnings() {
    return this.newPlayer.get('earnings')
  }

  get team() {
    return this.newPlayer.get('team')
  }
 }
