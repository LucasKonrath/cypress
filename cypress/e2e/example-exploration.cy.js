describe('Example.cypress.io - Main Site Exploration', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/')
  })

  it('should load the homepage and verify basic elements', () => {
    // Verify page title
    cy.title().should('include', 'Kitchen Sink')
    
    // Verify main heading
    cy.get('h1').should('contain.text', 'Kitchen Sink')
    
    // Verify the Cypress logo is visible
    cy.get('.navbar-brand').should('be.visible')
    
    // Verify navigation menu
    cy.get('.navbar-nav').should('be.visible')
    cy.get('.navbar-nav .nav-link').should('have.length.greaterThan', 0)
  })

  it('should navigate through all main sections', () => {
    // Get all navigation links and visit each one
    cy.get('.navbar-nav .nav-link').each(($link) => {
      const href = $link.attr('href')
      if (href && href.startsWith('/commands/')) {
        cy.wrap($link).click()
        // Wait for page to load and verify URL changed
        cy.url().should('include', href)
        // Go back to homepage for next iteration
        cy.visit('/')
      }
    })
  })

  it('should explore the querying commands section', () => {
    cy.visitAndVerify('/commands/querying', 'Querying')
    
    // Test the get command examples
    cy.get('[data-cy="querying-example"]').should('be.visible')
    
    // Test various querying examples if they exist
    cy.get('button').contains('cy.get()').should('be.visible')
    
    // Look for code examples
    cy.get('pre').should('exist')
  })

  it('should test action commands', () => {
    cy.visitAndVerify('/commands/actions', 'Actions')
    
    // Look for action examples
    cy.get('[data-cy="action-email"]').should('be.visible').type('test@example.com')
    
    // Test textarea
    cy.get('[data-cy="action-textarea"]')
      .should('be.visible')
      .type('This is a test message for the textarea.')
    
    // Test clicking buttons
    cy.get('.action-btn').should('be.visible').click()
    
    // Test double click if available
    cy.get('[data-cy="action-div"]').dblclick()
    
    // Test right click if available
    cy.get('[data-cy="action-div"]').rightclick()
  })

  it('should verify window operations', () => {
    cy.visitAndVerify('/commands/window', 'Window')
    
    // Test window operations
    cy.window().should('have.property', 'top')
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    cy.title().should('include', 'Kitchen Sink')
  })

  it('should test viewport commands', () => {
    cy.visitAndVerify('/commands/viewport', 'Viewport')
    
    // Test viewport resizing
    cy.viewport(320, 480) // Mobile size
    cy.get('body').should('be.visible')
    
    cy.viewport(768, 1024) // Tablet size
    cy.get('body').should('be.visible')
    
    cy.viewport(1280, 720) // Desktop size (back to default)
    cy.get('body').should('be.visible')
  })

  it('should explore location commands', () => {
    cy.visitAndVerify('/commands/location', 'Location')
    
    // Test URL operations
    cy.url().should('include', '/commands/location')
    cy.location('pathname').should('include', '/commands/location')
    cy.location('protocol').should('eq', 'https:')
  })

  it('should test navigation commands', () => {
    cy.visitAndVerify('/commands/navigation', 'Navigation')
    
    // Navigate to another page
    cy.visitAndVerify('/commands/querying', 'Querying')
    
    // Use back navigation
    cy.go('back')
    cy.url().should('include', '/commands/navigation')
    
    // Use forward navigation
    cy.go('forward')
    cy.url().should('include', '/commands/querying')
    
    // Navigate back to navigation page for consistency
    cy.visitAndVerify('/commands/navigation', 'Navigation')
  })

  it('should explore assertions', () => {
    cy.visitAndVerify('/commands/assertions', 'Assertions')
    
    // Test different types of assertions
    cy.get('.assertion-table')
      .should('be.visible')
      .should('contain', 'Column')
    
    // Test text assertions
    cy.get('.assertion-table tbody tr')
      .should('have.length.greaterThan', 0)
      .first()
      .should('be.visible')
  })

  it('should verify responsive design', () => {
    const viewports = [
      { width: 375, height: 667, name: 'iPhone' },
      { width: 768, height: 1024, name: 'iPad' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ]
    
    viewports.forEach(viewport => {
      cy.viewport(viewport.width, viewport.height)
      cy.visit('/')
      
      // Verify page is still functional at different sizes
      cy.get('h1').should('be.visible')
      cy.get('.navbar').should('be.visible')
      
      // Log viewport for debugging
      cy.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height})`)
    })
  })

  it('should test keyboard navigation', () => {
    cy.visit('/')
    
    // Test tab navigation
    cy.get('body').tab()
    cy.focused().should('exist')
    
    // Test escape key functionality
    cy.get('body').type('{esc}')
    
    // Test enter key on focusable elements
    cy.get('a').first().focus().type('{enter}')
  })
})