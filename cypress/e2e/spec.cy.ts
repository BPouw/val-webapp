describe('Matches test', () => {
  it('Loads the page', () => {
    cy.visit('http://localhost:4200/')
  })
})

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