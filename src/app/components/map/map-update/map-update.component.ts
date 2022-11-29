import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Map } from 'src/app/models/map.model';
import { MapService } from 'src/app/services/map.service';
import { StorageService } from 'src/app/services/storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-map-update',
  templateUrl: './map-update.component.html',
  styleUrls: ['./map-update.component.css'],
})
export class MapUpdateComponent implements OnInit {
  private user: any;
  private checked: boolean = false;

  constructor(
    private storageService: StorageService,
    private mapService: MapService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }

  newMap = new FormGroup({
    name: new FormControl(this.data.name),
    description: new FormControl(this.data.description),
  });

  toggle(event: MatCheckboxChange): void {
    this.checked = event.checked;
  }

  submit(): void {
    if (this.newMap.valid) {
      let name = this.newMap.value.name || '';
      let active = this.checked;
      let description = this.newMap.value.description || '';

      let map: Map = {
        _id: this.data._id,
        name: name,
        is_active: active,
        thumbnail: this.data.thumbnail,
        description: description,
        author: this.user.id,
      };

      this.mapService.update(map).subscribe();
    }
  }
}
