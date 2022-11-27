import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Map } from 'src/app/models/map.model';
import { MapService } from 'src/app/services/map.service';
import { StorageService } from 'src/app/services/storage.service';
import { MapCreateComponent } from '../map-create/map-create.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  public isLoggedIn: boolean = false;

  public maps: Map[] = [];

  constructor(private storageService: StorageService, private mapService: MapService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.mapService.list().subscribe(data => {
      this.maps = data;
    })
    this.isLoggedIn = this.storageService.isLoggedIn()
  }

  createMap(): void {
    const dialogRef = this.dialog.open(MapCreateComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.mapService.list().subscribe(data => {
        this.maps = data;
      })
    })
  }

  openMap(map: Map): void {
    this.router.navigate(['maps', map._id]);
  }

}
