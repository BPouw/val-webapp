import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  public ownProfile: boolean = false;
  public followers: number = 0;
  public following: number = 0;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private storageService: StorageService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userService.getUser(params['id']).subscribe((data) => {
        this.user = data;
        this.signedUser = this.storageService.getUser();
        if (this.signedUser.id === this.user._id) {
          this.ownProfile = true;
        }
      });
      this.userService.getUserMatches(params['id']).subscribe((data) => {
        this.matches = data;
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
      this.userService.following(params['id']).subscribe((data) => {
        this.following = data.following;
      })
      this.userService.followers(params['id']).subscribe((data) => {
        this.followers = data.followers;
      })
    })

    this.signedUser = this.storageService.getUser();
    console.log(this.signedUser.id)
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

  follow() {
    this.user._id && this.userService.follow(this.user._id, this.signedUser.id).subscribe(() => {
      this.snackbar.open(`User followed`, '', {
        duration: 3000,
      });
      this.ngOnInit();
    })
  }


  unfollow() {
    this.user._id && this.userService.unfollow(this.user._id, this.signedUser.id).subscribe(() => {
      this.snackbar.open(`User unfollowed`, '', {
        duration: 3000,
      });
      this.ngOnInit();
    })
  }

}
