import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router} from '@angular/router'
import { DataTableDirective, DataTablesModule} from 'angular-datatables'
import { Observable, Subject } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { MatchService} from 'src/app/services/match.service'
import { TeamService } from 'src/app/services/team.service'

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>()

  matches$!: Observable<Match[]>
  matches: Match[] = []
  selectedId = 0

  batchSize = 10
  batchNmbr = 0

  constructor(private matchService: MatchService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10
    }

    this.matchService.batch(this.batchSize, this.batchNmbr).subscribe(data => {
      this.matches = this.matches.concat(data)

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy()
        this.dtTrigger.next(this.matches)
      })
        
    })


  }

  loadNextBatch(): void {
    this.batchNmbr += 1
    this.matchService.batch(this.batchSize, this.batchNmbr).subscribe(data => {
      this.matches = this.matches.concat(data)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy()
        this.dtTrigger.next(this.matches)
      })
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}