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
  })
})

describe('Matches test', () => {
  it('creates a match', () => {
    cy.visit('http://localhost:4200/matches')
    cy.contains('Create').click();
    cy.get('[formcontrolname="matchname"]').type('TEST MATCH')
    cy.get('[formcontrolname="map"]').click().get('mat-option').contains('Icebox').click();
    cy.get('[formcontrolname="team1"]').click().get('mat-option').contains('Sentinels').click();;
    cy.get('[formcontrolname="team2"]').click().get('mat-option').contains('100 Thieves').click();;
    cy.get('#mat-dialog-0 > app-match-create > div > a').click();
    cy.wait(10000);
  })

})