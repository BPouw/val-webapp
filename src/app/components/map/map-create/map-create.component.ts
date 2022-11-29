import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Map } from 'src/app/models/map.model';
import { MapService } from 'src/app/services/map.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-map-create',
  templateUrl: './map-create.component.html',
  styleUrls: ['./map-create.component.css'],
})
export class MapCreateComponent implements OnInit {
  private user: any;
  private checked: boolean = false;

  constructor(
    private storageService: StorageService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }

  newMap = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
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
        _id: undefined,
        name: name,
        is_active: active,
        thumbnail:
          'https://static.wikia.nocookie.net/valorant/images/1/10/Loading_Screen_Breeze.png',
        description: description,
        author: this.user.id,
      };

      this.mapService.create(map).subscribe();
    }
  }
}
