import { Country } from '@angular-material-extensions/select-country';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from 'src/app/models/team.model';
import { StorageService } from 'src/app/services/storage.service';
import { TeamService } from 'src/app/services/team.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-team-update',
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.css'],
})
export class TeamUpdateComponent implements OnInit {
  private defaultValue: Country = {
    name: this.data.country,
    alpha2Code: '',
    alpha3Code: '',
    numericCode: '',
    callingCode: '',
  };

  private user: any;

  constructor(
    private storageService: StorageService,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }

  newTeam = new FormGroup({
    teamname: new FormControl(this.data.teamname, Validators.required),
    country: new FormControl<Country>(this.defaultValue, Validators.required),
    ranking: new FormControl<number>(this.data.ranking, Validators.required),
  });

  submit(): void {
    if (this.newTeam.valid) {
      let teamname = this.newTeam.value.teamname || '';
      let country = this.newTeam.value.country?.name || this.defaultValue.name;
      let ranking = this.newTeam.value.ranking || 0;

      let team: Team = {
        _id: this.data._id,
        teamname: teamname,
        country: country,
        ranking: ranking,
        author: this.user.id,
        logo: 'https://www.vlr.gg/img/vlr/tmp/vlr.png',
      };

      this.teamService.update(team).subscribe();
    }
  }

  get teamname() {
    return this.newTeam.get('teamname')
  }

  get country() {
    return this.newTeam.get('country')
  }

  get ranking() {
    return this.newTeam.get('ranking')
  }
}
