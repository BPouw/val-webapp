import { Country } from '@angular-material-extensions/select-country';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Team } from 'src/app/models/team.model';
import { StorageService } from 'src/app/services/storage.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css'],
})
export class TeamCreateComponent implements OnInit {
  private defaultValue: Country = {
    name: 'Germany',
    alpha2Code: 'DE',
    alpha3Code: 'DEU',
    numericCode: '276',
    callingCode: '',
  };

  private user: any;

  constructor(
    private storageService: StorageService,
    private teamService: TeamService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }

  newTeam = new FormGroup({
    teamname: new FormControl('', Validators.required),
    country: new FormControl<Country>(this.defaultValue, Validators.required),
    ranking: new FormControl<number>(0, Validators.required),
  });

  submit(): void {
    if (this.newTeam.valid) {
      let teamname = this.newTeam.value.teamname || '';
      let country = this.newTeam.value.country?.name || this.defaultValue.name;
      let ranking = this.newTeam.value.ranking || 0;

      let team: Team = {
        _id: undefined,
        teamname: teamname,
        country: country,
        ranking: ranking,
        author: this.user.id,
        logo: 'https://www.vlr.gg/img/vlr/tmp/vlr.png',
      };

      this.teamService.create(team).subscribe(() => {
        this.snackbar.open(`Team successfully created`, '', {
          duration: 3000,
        });
      });
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
