describe('Navbar test', () => {
  it('visits teams', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Teams').click()
  })
  it('visits matches', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Matches').click()
  })
  it('visits players', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Players').click()
  })
  it('visits maps', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Maps').click()
  })
  it('visits about', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('About').click()
  })
  it('visits login', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Login').click()
  })
  it('visits signup', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Sign Up').click()
  })
})

describe('Login test', () => {
  it('loads the page', () => {
    cy.visit('http://localhost:4200/login')
    cy.contains('Login')
  })

  it('logs in with credentials', () => {
    cy.visit('http://localhost:4200/login')
    cy.get('body > app-root > app-login > mat-card > mat-card-content > form')
      .get('#mat-input-0')
      .type('pouw')
      .get('#mat-input-1')
      .type('something')
    cy.get('button').contains('Login').click();
    cy.wait(2000);
  })
})

describe('Matches test', () => {
  it('creates a match', () => {
    cy.visit('http://localhost:4200/matches')
    cy.get('body > app-root > app-matches > div > div > a > span.mat-button-wrapper').click();
    cy.get('[formcontrolname="matchname"]').type('TEST MATCH')
    cy.get('[formcontrolname="map"]').click().get('mat-option').contains('Icebox').click();
    cy.get('[formcontrolname="team1"]').click().get('mat-option').contains('Sentinels').click();;
    cy.get('[formcontrolname="team2"]').click().get('mat-option').contains('The Guard').click();;
    cy.get('#mat-dialog-0 > app-match-create > div > a').click();
    cy.wait(3000);
  })

  it('visits our new match', () => {
    cy.visit('http://localhost:4200/matches')
    cy.contains('TEST MATCH').click()
  })

  it('updates the new match', () => {
    cy.get('body > div.matchcontainer > div:nth-child(7) > div > a.mat-focus-indicator.mat-raised-button.mat-button-base.mat-accent > span.mat-button-wrapper').click()
    cy.get('[formcontrolname="matchname"]').type('2')
    cy.get('#mat-dialog-0 > app-match-update > div > a').click()
    cy.wait(2000);
  })

  it('deletes the new match', () => {
    cy.get('body > div.matchcontainer > div:nth-child(7) > div > a.mat-focus-indicator.delete.mat-raised-button.mat-button-base.mat-primary').click()
  })
})

describe('Teams test', () => {
  it('creates a new team', () => {
    cy.visit('http://localhost:4200/teams')
    cy.get('body > app-root > app-teams > div.header > div > a > span.mat-button-wrapper').click()
    cy.get('[formcontrolname="teamname"]').type('TEST TEAM')
    cy.get('#mat-dialog-0 > app-team-create > div > a').click()
    cy.wait(2000);
  })

  it('visits the new team', () => {
    cy.visit('http://localhost:4200/teams')
    cy.contains('TEST TEAM').click()
  })

  it('updates the new team', () => {
    cy.get('body > app-root > app-team-details > div.infocontainer > div:nth-child(3) > div > a.mat-focus-indicator.mat-raised-button.mat-button-base.mat-accent').click()
    cy.get('#mat-dialog-0 > app-team-update > div')
    cy.get('[formcontrolname="teamname"]').type('2')
    cy.get('#mat-dialog-0 > app-team-update > div > a').click()
    cy.wait(2000);
  })

  it('deletes the new team', () => {
    cy.get('body > app-root > app-team-details > div.infocontainer > div:nth-child(3) > div > a.mat-focus-indicator.delete.mat-raised-button.mat-button-base.mat-primary').click()
  })
})

describe('Players test', () => {
  it('creates a new player', () => {
    cy.visit('http://localhost:4200/players')
    cy.get('body > app-root > app-players > div.header > div > a').click()
    cy.get('#mat-dialog-0 > app-player-create > div')
    cy.get('[formcontrolname="gamertag"]').type('TEST PLAYER')
    cy.get('[formcontrolname="name"]').type('Test Player')
    cy.get('[formcontrolname="agents"]').click().get('mat-option').contains('Reyna').click().type('{esc}');
    cy.get('[formcontrolname="team"]').click().get('mat-option').contains('100 Thieves').click();
    cy.get('#mat-dialog-0 > app-player-create > div > a').click();
    cy.wait(2000);
  })

  it('visits the new player', () => {
    cy.visit('http://localhost:4200/players')
    cy.contains('TEST PLAYER').click()
  })

  it('updates the new player', () => {
    cy.get('body > app-root > app-player-details > div:nth-child(4) > div > a.mat-focus-indicator.mat-raised-button.mat-button-base.mat-accent > span.mat-button-wrapper').click()
    cy.get('#mat-dialog-0 > app-player-update > div')
    cy.get('[formcontrolname="agents"]').click().get('mat-option').contains('Jett').click().type('{esc}');
    cy.get('#mat-dialog-0 > app-player-update > div > a').click();
    cy.wait(2000);
  })

  it('deletes the new player', () => {
    cy.get('body > app-root > app-player-details > div:nth-child(4) > div > a.mat-focus-indicator.delete.mat-raised-button.mat-button-base.mat-primary > span.mat-button-wrapper').click()
  })
})

describe('Maps test', () => {
  it('creates a new map', () => {
    cy.visit('http://localhost:4200/maps')
    cy.get('body > app-root > app-maps > div.header > div > a > span.mat-button-wrapper').click();
    cy.get('#mat-dialog-0 > app-map-create > div')
    cy.get('[formcontrolname="name"]').type('TEST MAP')
    cy.get('[formcontrolname="description"]').type('This is a test map')
    cy.get('#mat-dialog-0 > app-map-create > div > a > span.mat-button-wrapper').click()
  })

  it('visits the new map', () => {
    cy.visit('http://localhost:4200/maps')
    cy.contains('TEST MAP').click()
  })

  it('updates the new map', () => {
    
  })
})