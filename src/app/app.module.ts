import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule} from '@angular/material/icon';
import { MatchesComponent } from './components/match/matches/matches.component'
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatchDetailsComponent } from './components/match/match-details/match-details.component';
import { MatListModule} from '@angular/material/list';
import { TeamsComponent } from './components/team/teams/teams.component';
import { TeamDetailsComponent } from './components/team/team-details/team-details.component';
import { PlayersComponent } from './components/player/players/players.component';
import { PlayerDetailsComponent } from './components/player/player-details/player-details.component';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule} from '@angular/material/card';
import { LoginComponent } from './components/shared/login/login.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { RegisterComponent } from './components/shared/register/register.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PlayerCreateComponent } from './components/player/player-create/player-create.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PlayerUpdateComponent } from './components/player/player-update/player-update.component';
import { TeamCreateComponent } from './components/team/team-create/team-create.component';
import { TeamUpdateComponent } from './components/team/team-update/team-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MatchesComponent,
    MatchDetailsComponent,
    TeamsComponent,
    TeamDetailsComponent,
    PlayersComponent,
    PlayerDetailsComponent,
    LoginComponent,
    RegisterComponent,
    PlayerCreateComponent,
    PlayerUpdateComponent,
    TeamCreateComponent,
    TeamUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    DataTablesModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectCountryModule.forRoot('en'),
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
