import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private mapService: MapService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }

  newMap = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
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

      this.mapService.create(map).subscribe(() => {
        this.snackbar.open(`Player successfully created`, '', {
          duration: 3000,
        });
      });
    }
  }

  get name() {
    return this.newMap.get('name');
  }

  get description() {
    return this.newMap.get('description')
  }
}
