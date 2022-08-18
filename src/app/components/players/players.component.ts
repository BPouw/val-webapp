import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[] = [];

  constructor(private playerService: PlayerService, private router: Router) { }

  ngOnInit(): void {
    this.playerService.list().subscribe(data => {
      this.players = data;
      console.log(this.players)
    })
  }

  playerDetails(player: Player): void {
    this.router.navigate(['players', player._id])
  }

}
