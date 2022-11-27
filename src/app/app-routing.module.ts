import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesComponent } from './components/match/matches/matches.component';
import { MatchDetailsComponent } from './components/match/match-details/match-details.component';
import { TeamsComponent } from './components/team/teams/teams.component';
import { TeamDetailsComponent } from './components/team/team-details/team-details.component';
import { PlayersComponent } from './components/player/players/players.component';
import { PlayerDetailsComponent } from './components/player/player-details/player-details.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesComponent
  },
  {
    path: 'matches',
    component: MatchesComponent
  },
  {
    path: 'matches/:id',
    component: MatchDetailsComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'teams/:id',
    component: TeamDetailsComponent
  },
  {
    path: 'players',
    component: PlayersComponent,
  },
  {
    path: 'players/:id',
    component: PlayerDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
