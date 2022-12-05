import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';
import { Map } from 'src/app/models/map.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MapUpdateComponent } from '../map-update/map-update.component';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-map-details',
  templateUrl: './map-details.component.html',
  styleUrls: ['./map-details.component.css'],
})
export class MapDetailsComponent implements OnInit {
  public map!: Map;
  public user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mapService: MapService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let mapId = params['id'];
      this.mapService.read(mapId).subscribe((data) => {
        this.map = data;
      });
    });
    this.user = this.storageService.getUser();
  }

  update(): void {
    const dialogRef = this.dialog.open(MapUpdateComponent, {
      data: this.map,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
      this.snackbar.open(`Map successfully updated`, '', {
        duration: 3000,
      });
    });
  }

  delete(): void {
    this.map._id && this.mapService.delete(this.map._id).subscribe(() => {
      this.router.navigate(['maps']);
      this.snackbar.open(`Map ${this.map.name} successfully deleted`, '', {
        duration: 3000,
      });
    });
  }

  userDetails(user: User): void {
    this.router.navigate(['user', user._id])
  }
}
