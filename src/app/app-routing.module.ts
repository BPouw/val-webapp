import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchDetailsComponent } from './components/match-details/match-details.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';

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
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
