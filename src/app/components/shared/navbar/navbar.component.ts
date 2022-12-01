import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public user!: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.storageService.changeEmitted$.subscribe((result) => {
      this.signedIn = result;     
      this.user = this.storageService.getUser();
      console.log(this.user)
    });
  }

  signedIn = false;

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.signedIn = true;
      this.user = this.storageService.getUser();
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

  openUserPage(user: any): void {
    console.log(user)
    this.router.navigate(['user', user.id]);
  }

  signOut(): void {
    this.authService.logout().subscribe();
    this.storageService.clean();
    this.signedIn = false;
    this.router.navigate(['login']);
  }
}
