describe('Example.cypress.io - Forms and Interactions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should test all form interactions', () => {
    cy.visitAndVerify('/commands/actions', 'Actions')
    
    // Email input
    cy.get('[data-cy="action-email"]')
      .should('be.visible')
      .clear()
      .type('cypress.test@example.com')
      .should('have.value', 'cypress.test@example.com')
    
    // Password input (if exists)
    cy.get('input[type="password"]').then($inputs => {
      if ($inputs.length > 0) {
        cy.wrap($inputs.first())
          .clear()
          .type('SecurePassword123!')
      }
    })
    
    // Textarea
    cy.get('[data-cy="action-textarea"]')
      .should('be.visible')
      .clear()
      .type('This is a comprehensive test of the textarea functionality. {enter}New line test.')
    
    // Dropdown/Select
    cy.get('select').then($selects => {
      if ($selects.length > 0) {
        cy.wrap($selects.first()).select(1) // Select by index
      }
    })
    
    // Checkboxes
    cy.get('input[type="checkbox"]').then($checkboxes => {
      if ($checkboxes.length > 0) {
        cy.wrap($checkboxes.first()).check().should('be.checked')
        cy.wrap($checkboxes.first()).uncheck().should('not.be.checked')
      }
    })
    
    // Radio buttons
    cy.get('input[type="radio"]').then($radios => {
      if ($radios.length > 0) {
        cy.wrap($radios.first()).check().should('be.checked')
      }
    })
  })

  it('should test file upload functionality', () => {
    cy.visitAndVerify('/commands/actions', 'Actions')
    
    // Look for file input
    cy.get('input[type="file"]').then($fileInputs => {
      if ($fileInputs.length > 0) {
        // Create a test file
        const fileName = 'test-file.txt'
        const fileContent = 'This is a test file for upload'
        
        cy.wrap($fileInputs.first()).selectFile({
          contents: fileContent,
          fileName: fileName,
          mimeType: 'text/plain'
        }, { force: true })
      }
    })
  })

  it('should test drag and drop functionality', () => {
    cy.visitAndVerify('/commands/actions', 'Actions')
    
    // Look for draggable elements
    cy.get('[draggable="true"], .draggable').then($draggables => {
      if ($draggables.length > 0) {
        // Test drag and drop if elements exist
        cy.wrap($draggables.first()).trigger('dragstart')
        
        // Look for drop zones
        cy.get('.drop-zone, [droppable="true"]').then($dropZones => {
          if ($dropZones.length > 0) {
            cy.wrap($dropZones.first()).trigger('drop')
          }
        })
      }
    })
  })

  it('should test hover and focus interactions', () => {
    cy.visitAndVerify('/commands/actions', 'Actions')
    
    // Test hover effects
    cy.get('.btn, button, a').first().trigger('mouseover')
    
    // Test focus and blur
    cy.get('input').first().focus().should('be.focused')
    cy.get('input').first().blur().should('not.be.focused')
  })
})