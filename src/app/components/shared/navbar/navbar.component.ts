import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.storageService.changeEmitted$.subscribe((result) => {
      this.signedIn = result;
    });
  }

  signedIn = false;

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.signedIn = true;
    }
  }

  openMatches(): void {
    this.router.navigate(['matches']);
  }

  openTeams(): void {
    this.router.navigate(['teams']);
  }

  openPlayers(): void {
    this.router.navigate(['players']);
  }

  openMaps(): void {
    this.router.navigate(['maps']);
  }

  openLogin(): void {
    this.router.navigate(['login']);
  }

  openRegister(): void {
    this.router.navigate(['register']);
  }

  signOut(): void {
    this.storageService.clean();
    this.authService.logout();
    this.signedIn = false;
    this.router.navigate(['login']);
  }
}
