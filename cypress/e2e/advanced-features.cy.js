describe('Example.cypress.io - Advanced Features and Utilities', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should test network requests and interceptors', () => {
    cy.visitAndVerify('/commands/network-requests', 'Network Requests')
    
    // Intercept API calls
    cy.intercept('GET', '**/comments/*', { fixture: 'comments.json' }).as('getComments')
    cy.intercept('POST', '**/comments', { statusCode: 201 }).as('postComment')
    
    // Trigger network requests if buttons exist
    cy.get('button').contains('Get Comment').then($btn => {
      if ($btn.length > 0) {
        cy.wrap($btn).click()
        cy.wait('@getComments')
      }
    })
  })

  it('should test cookies and local storage', () => {
    cy.visitAndVerify('/commands/cookies', 'Cookies')
    
    // Set and verify cookies
    cy.setCookie('test-cookie', 'cypress-value')
    cy.getCookie('test-cookie').should('have.property', 'value', 'cypress-value')
    
    // Clear cookies
    cy.clearCookie('test-cookie')
    cy.getCookie('test-cookie').should('be.null')
    
    // Test local storage
    cy.window().then((win) => {
      win.localStorage.setItem('test-key', 'test-value')
    })
    
    cy.window().its('localStorage').invoke('getItem', 'test-key').should('eq', 'test-value')
    
    // Clear local storage
    cy.clearLocalStorage()
    cy.window().its('localStorage').invoke('getItem', 'test-key').should('be.null')
  })

  it('should test utilities and helpers', () => {
    cy.visitAndVerify('/commands/utilities', 'Utilities')
    
    // Test wrap utility
    const obj = { name: 'Cypress', type: 'Testing Tool' }
    cy.wrap(obj).should('have.property', 'name', 'Cypress')
    
    // Test task execution
    cy.task('log', 'Testing task execution from Cypress')
    
    // Test fixture loading
    cy.fixture('example').then((data) => {
      expect(data).to.exist
    })
  })

  it('should test waiting and timing', () => {
    cy.visitAndVerify('/commands/waiting', 'Waiting')
    
    // Test explicit waits
    cy.wait(1000) // Wait for 1 second
    
    // Test waiting for elements
    cy.get('body').should('be.visible')
    
    // Test waiting for conditions
    cy.get('.loading').should('not.exist')
    
    // Test retry-ability
    let attempts = 0
    cy.window().then(() => {
      attempts++
      expect(attempts).to.be.at.least(1)
    })
  })

  it('should test screenshots and videos', () => {
    cy.visit('/')
    
    // Take a screenshot
    cy.screenshot('homepage-full', { capture: 'fullPage' })
    
    // Take element screenshot
    cy.get('h1').screenshot('main-heading')
    
    // Navigate and take another screenshot
    cy.visitAndVerify('/commands/actions', 'Actions')
    cy.screenshot('actions-page')
  })

  it('should test custom commands', () => {
    // Test the custom commands we created
    cy.visitAndVerify('/commands/querying', 'Querying')
    
    // Use our custom visibility command
    cy.shouldBeVisibleWithRetry('h1')
    
    // Test navigation with verification
    cy.visitAndVerify('/commands/assertions', 'Assertions')
  })

  it('should test error handling and recovery', () => {
    // Test handling of non-existent elements gracefully
    cy.visit('/')
    
    // Test that we can handle missing elements
    cy.get('body').then($body => {
      if ($body.find('.non-existent-element').length === 0) {
        cy.log('Element does not exist, which is expected')
      }
    })
    
    // Test navigation to non-existent page
    cy.request({
      url: '/non-existent-page',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('should test performance and load times', () => {
    const startTime = Date.now()
    
    cy.visit('/')
    
    cy.window().then(() => {
      const loadTime = Date.now() - startTime
      cy.log(`Page load time: ${loadTime}ms`)
      expect(loadTime).to.be.lessThan(5000) // Should load within 5 seconds
    })
    
    // Test that critical elements load quickly
    cy.get('h1').should('be.visible')
    cy.get('.navbar').should('be.visible')
  })
})