import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  player!: Player;
  team!: Team;
  agents: String[] = []
  lowAgents: String[] = []

  constructor(private activatedRoute: ActivatedRoute, private playerService: PlayerService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.playerService.read(params['id']).subscribe(data => {
        this.player = data;
        this.team = this.player.team;
        this.agents = this.player.agents
        for(let agent of this.agents) {
          let lowagent = agent.toLowerCase()
          this.lowAgents.push(lowagent)
        }
        console.log(this.lowAgents)
      })
    })
  }

  teamDetails(team: Team): void {
    this.router.navigate(["teams", team._id])
  }

}
