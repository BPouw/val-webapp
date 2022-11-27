import { Country } from '@angular-material-extensions/select-country';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Team } from 'src/app/models/team.model';
import { StorageService } from 'src/app/services/storage.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})

export class TeamCreateComponent implements OnInit {

  private defaultValue: Country = {
    name: 'Deutschland',
    alpha2Code: 'DE',
    alpha3Code: 'DEU',
    numericCode: '276',
    callingCode: ''
  };

  private user: any;

  constructor(private storageService: StorageService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }
  

  newTeam = new FormGroup({
    teamname: new FormControl(''),
    country: new FormControl<Country>(this.defaultValue),
    ranking: new FormControl<number>(0)
  })

  submit(): void {
    if (this.newTeam.valid) {
      let teamname = this.newTeam.value.teamname || ""
      let country = this.newTeam.value.country?.name || this.defaultValue.name
      let ranking = this.newTeam.value.ranking || 0

      let team: Team = {
        _id: undefined,
        teamname: teamname,
        country: country,
        ranking: ranking,
        author: this.user.id,
        logo: 'https://www.vlr.gg/img/vlr/tmp/vlr.png',
        players: [],
        matches: [],
        tournaments: []
      }

      this.teamService.create(team).subscribe();
    }
  }

}
