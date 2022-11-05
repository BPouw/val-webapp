import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openMatches(): void {
    this.router.navigate(['matches'])
  }

  openTeams(): void {
    this.router.navigate(['teams'])
  }

  openPlayers(): void {
    this.router.navigate(['players'])
  }

  openLogin(): void {
    this.router.navigate(['login'])
  }

  openRegister(): void {
    this.router.navigate(['register'])
  }

}
