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
})