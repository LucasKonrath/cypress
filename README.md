# Cypress Example.cypress.io Exploration

This project contains comprehensive Cypress scripts to explore and test the example.cypress.io website, which is the official Cypress testing kitchen sink application.

## Project Structure

```
cypress/
├── e2e/
│   ├── example-exploration.cy.js     # Main exploration tests
│   ├── forms-interactions.cy.js      # Form and interaction tests
│   └── advanced-features.cy.js       # Advanced features and utilities
├── fixtures/
│   ├── example.json                  # Sample test data
│   └── comments.json                 # Mock API responses
└── support/
    ├── commands.js                   # Custom Cypress commands
    └── e2e.js                       # Support file configuration
```

## Features Tested

### Main Exploration (`example-exploration.cy.js`)
- Homepage verification and navigation
- All main sections exploration
- Querying commands testing
- Action commands verification
- Window and viewport operations
- Location and navigation commands
- Assertions testing
- Responsive design verification
- Keyboard navigation

### Forms and Interactions (`forms-interactions.cy.js`)
- Email input and validation
- Password fields
- Textarea interactions
- Dropdown/select elements
- Checkboxes and radio buttons
- File upload functionality
- Drag and drop operations
- Hover and focus interactions

### Advanced Features (`advanced-features.cy.js`)
- Network request interception
- Cookies and local storage management
- Utilities and helper functions
- Waiting and timing operations
- Screenshots and video recording
- Custom command usage
- Error handling and recovery
- Performance and load time testing

## Available Scripts

```bash
# Open Cypress Test Runner (interactive mode)
npm run cy:open

# Run all tests in headless mode
npm run cy:run

# Run tests in specific browsers
npm run cy:run:chrome
npm run cy:run:firefox

# Run tests in headed mode (see browser)
npm run cy:run:headed

# Shortcut for running tests
npm test
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run tests interactively:**
   ```bash
   npm run cy:open
   ```
   This opens the Cypress Test Runner where you can select and run individual tests.

3. **Run all tests in headless mode:**
   ```bash
   npm run cy:run
   ```

4. **Run specific test file:**
   ```bash
   npx cypress run --spec "cypress/e2e/example-exploration.cy.js"
   ```

## Custom Commands

The project includes custom commands defined in `cypress/support/commands.js`:

- `cy.shouldBeVisibleWithRetry(selector, options)` - Check element visibility with retry logic
- `cy.visitAndVerify(path, expectedTitle)` - Navigate and verify page load with title check

## Configuration

The Cypress configuration is set in `cypress.config.js`:
- Base URL: `https://example.cypress.io`
- Viewport: 1280x720
- Video recording enabled
- Screenshots on failure enabled

## Test Data

Fixture files in `cypress/fixtures/` contain:
- `example.json` - Sample user and configuration data
- `comments.json` - Mock API response data for network testing

## Tips for Running

1. **Network Tests**: Some tests intercept network requests. Ensure you have internet connectivity.

2. **Visual Tests**: Screenshot and video files are generated in the `cypress/screenshots/` and `cypress/videos/` directories.

3. **Browser Compatibility**: Tests are designed to work across Chrome, Firefox, and Edge browsers.

4. **Responsive Testing**: Tests include viewport changes to verify responsive behavior.

## Troubleshooting

- If tests fail due to timeouts, the site might be slow. Increase timeouts in the configuration.
- Some interactive elements might not be available on all pages. Tests include existence checks.
- Network interception tests require the specific API endpoints to be available.

## Learning Cypress

This project serves as a comprehensive example of Cypress testing patterns including:
- Page navigation and URL verification
- Element interaction and form testing
- Network request mocking and testing
- Custom command creation
- Fixture data usage
- Screenshot and video capture
- Cross-browser testing approaches