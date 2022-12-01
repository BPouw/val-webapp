import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Map } from 'src/app/models/map.model';
import { Match } from 'src/app/models/match.model';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user!: User;
  public matches?: Match[];
  public teams?: Team[];
  public players?: Player[];
  public maps?: Map[];
  public signedUser: any;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userService.getUser(params['id']).subscribe((data) => {
        this.user = data;
        console.log(this.user)
      });
      this.userService.getUserMatches(params['id']).subscribe((data) => {
        this.matches = data;
        console.log(this.matches)
      })
      this.userService.getUserTeams(params['id']).subscribe((data) => {
        this.teams = data;
      })
      this.userService.getUserPlayers(params['id']).subscribe((data) => {
        this.players = data;
      })
      this.userService.getUserMaps(params['id']).subscribe((data) => {
        this.maps = data;
      })
    })

    this.signedUser = this.storageService.getUser();

  }

  matchDetails(match: Match) {
    this.router.navigate(['matches', match._id])
  }

  teamDetails(team: Team) {
    this.router.navigate(['teams', team._id])
  }

  playerDetails(player: Player) {
    this.router.navigate(['players', player._id])
  }

  mapDetails(map: Map) {
    this.router.navigate(['maps', map._id])
  }

}
