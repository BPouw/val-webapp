import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router} from '@angular/router'
import { Match } from 'src/app/models/match.model';
import { MatchService} from 'src/app/services/match.service'

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})

export class MatchesComponent implements OnInit {

  matches: Match[] = []
  columnsToDisplay = ['date', 'matchname', 'map', 'teams', 'score', 'winner']
  selectedId = 0

  batchSize = 10
  batchNmbr = 0

  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.matchService.batch(this.batchSize, this.batchNmbr).subscribe(data => {
      this.matches = this.matches.concat(data)
      console.log(data)      
    })


  }

  loadNextBatch(): void {
    this.batchNmbr += 1
    this.matchService.batch(this.batchSize, this.batchNmbr).subscribe(data => {
      this.matches = this.matches.concat(data)

    })
  }

  ngOnDestroy(): void {
    
  }

}