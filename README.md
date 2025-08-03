# BEES Tech Test - Brewery Finder Application

A React TypeScript application for discovering and managing favorite breweries, built as part of the BEES front-end technical challenge.

## 🚀 Live Demo

The application is hosted on Vercel and can be accessed at: [Vercel Host Live Demo](https://bees-tech-test.vercel.app)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Decisions](#architecture-decisions)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [API Integration](#api-integration)

## 🎯 Overview

This application allows users to:
- Enter their full name and confirm they are 18+ years old
- Search for breweries using the Open Brewery DB API
- Add/remove breweries to/from their favorites list
- View detailed brewery information including location, type, and contact details

## 🛠 Tech Stack

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.7.1
- **HTTP Client**: Fetch API
- **Icons**: React Icons 5.5.0
- **Build Tool**: Vite 7.0.4
- **Testing**: Vitest 3.2.4 + React Testing Library 16.3.0
- **E2E Testing**: Cypress 14.5.3
- **Linting**: ESLint 9.30.1

## 📁 Project Structure

```
.github/
├── workflows/          # CI/CD pipeline configuration
│   └── tests.yml       # GitHub Actions workflow for running tests
cypress/
├── e2e/                # End-to-end test specs
├── fixtures/           # Test data
├── support/            # Cypress support files
src/
├── components/          # Reusable UI components
│   ├── Badge/          # Brewery type, postal code, phone badges
│   ├── Button/         # Primary/secondary button variants
│   ├── Card/           # Brewery information cards
│   ├── Checkbox/       # Custom checkbox with validation
│   ├── Input/          # Text input with error handling
│   ├── Loading/        # Loading spinner component
│   ├── Navbar/         # Navigation with user info and logout
│   ├── ProtectedRoute/ # Route protection for authenticated users
│   └── index.ts        # Component exports
├── contexts/           # React Context providers
│   └── UserContext.tsx # User state and favorites management
├── hooks/              # Custom React hooks
│   └── useBrewerySearch.ts # Brewery search functionality
├── pages/              # Application pages
│   ├── Home/           # Login/registration page
│   └── Places/         # Main brewery search and favorites page
├── __tests__/          # Test files
│   ├── components/     # Component unit tests
│   ├── contexts/       # Context provider tests
│   ├── hooks/          # Custom hook tests
│   └── pages/          # Page integration tests
├── types.d.ts          # TypeScript type definitions
└── utils/              # Utility functions
```

## 🏗 Architecture Decisions

### State Management - Context API

I chose to use React's Context API instead of Redux for state management because:

- **Project Simplicity**: This is a relatively small application with straightforward state requirements
- **Development Speed**: Context API requires less boilerplate and setup time
- **Team Familiarity**: Built-in React feature, no additional learning curve
- **Bundle Size**: No external dependencies needed
- **Delivery Timeline**: Reduced complexity helps meet the 3-day deadline without risking implementation issues

The `UserContext.tsx`  manages:
- User authentication state (name, age verification)
- Brewery favorites list
- Local storage persistence

### Pages Architecture

The application follows a simple two-page structure:

#### `Home`
- **Purpose**: User registration and validation
- **Features**: 
  - Full name validation (first + last name required)
  - Age verification checkbox
  - Form validation with real-time feedback
  - Accessibility features (ARIA labels, screen reader support)

#### `Places`
- **Purpose**: Main application interface
- **Features**:
  - Favorites section with remove functionality
  - Brewery search with API integration
  - Add to favorites functionality
  - Responsive card layout

### Custom Hooks

The `useBrewerySearch.ts` hook encapsulates:
- Search state management
- API call logic
- Loading states
- Error handling

This separation of concerns makes the component logic cleaner and the search functionality reusable.

### Context API Implementation

The `UserContext.tsx` provides:
- Centralized user state
- Favorites management
- Local storage persistence
- Type-safe context consumption

## 🌐 API Integration & CORS Proxy

Due to CORS restrictions when calling the Open Brewery DB API directly from the browser, I implemented a proxy solution:

```typescript
const res = await fetch(
  `https://cors-anywhere-filipeleonelbatista.onrender.com/https://api.openbrewerydb.org/v1/breweries/search?per_page=6&query=${encodeURIComponent(search)}`
);
```

**Why a proxy was necessary:**
- The Open Brewery DB API doesn't include CORS headers for browser requests
- This is a common issue when consuming third-party APIs from client-side applications
- The proxy server adds the necessary CORS headers to allow browser requests

**Proxy solution:**
- I use a personal CORS proxy service that I maintain for such scenarios
- In production, this would typically be handled by a backend service
- The proxy simply forwards requests and adds appropriate CORS headers

## 🧪 Testing

### Unit & Integration Tests (Vitest + React Testing Library)

The project includes comprehensive tests for components, hooks, and contexts:

**Component Tests Example** - `Button.test.tsx`:
```typescript
it('should handle click events', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('should be disabled when disabled prop is true', () => {
  render(<Button disabled>Disabled</Button>);
  
  const button = screen.getByRole('button');
  expect(button).toBeDisabled();
  expect(button).toHaveClass('bg-gray-600', 'cursor-not-allowed');
});
```

**Context Tests Example** - `UserContext.test.tsx`:
```typescript
it('should add brewery to favorites', () => {
  const { result } = renderHook(() => useUser(), { wrapper });
  const brewery = { id: '1', name: 'Test Brewery' };
  
  act(() => {
    result.current.addFavorite(brewery);
  });
  
  expect(result.current.breweryFavorites).toContain(brewery);
});
```

**What the tests validate:**
- Component rendering and props handling
- User interactions (clicks, form submissions)
- State management and context operations
- Form validation logic
- Error handling scenarios
- Accessibility features

### End-to-End Tests (Cypress)

Cypress tests cover complete user workflows:

**Login Flow Test** - `login.cy.ts`:
```typescript
it('should navigate to places page when form is submitted', () => {
  cy.get('input[id="name"]').type('John Doe');
  cy.get('label[for="age"]').click();
  cy.get('button').click();
  cy.wait(500);
  cy.url().should('include', '/places');
});
```

**Search Functionality Test** - `search.cy.ts`:
```typescript
it('should search for breweries', () => {
  cy.intercept('GET', '**/api.openbrewerydb.org/**', {
    fixture: 'breweries.json'
  }).as('searchBreweries');

  cy.get('input[aria-label="Search brewery"]').type('brewery');
  cy.get('button').contains('Search').click();
  cy.wait('@searchBreweries');
  
  cy.get('[data-cy="brewery-card"]').should('have.length.gt', 0);
});
```

**What E2E tests validate:**
- Complete user registration flow
- Form validation and error states
- Navigation between pages
- API integration with mocked responses
- Favorites management (add/remove)
- Search functionality
- Responsive design elements

### Running Tests

```bash
# Unit tests
npm test

# E2E tests (headless)
npm run test:e2e

# E2E tests (interactive)
npm run test:e2e:open
```

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions workflow (`tests.yml`) that:

**Automated Testing Pipeline:**
- **Triggers**: Runs on push to any branch and pull requests
- **Environment**: Ubuntu latest with Node.js 22
- **Dependencies**: Uses npm cache for faster builds
- **Unit Tests**: Executes Vitest test suite
- **E2E Tests**: Runs Cypress tests with Chrome browser
- **Server Management**: Automatically starts dev server and waits for availability
- **Timeout Handling**: 60-second timeout for server startup

**Pipeline Steps:**
1. Checkout code from repository
2. Setup Node.js 22 with npm caching
3. Install project dependencies
4. Run unit tests with Vitest
5. Start development server
6. Wait for server to be available on localhost:5173
7. Execute Cypress E2E tests in Chrome

**Benefits:**
- Ensures code quality on every commit
- Prevents broken code from being merged
- Validates both unit and integration functionality
- Tests real browser interactions
- Provides confidence for deployment

## 🚀 Installation & Setup

### Prerequisites
- Node.js 22+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bees-tech-test

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

No environment variables are required for basic functionality. The application uses:
- Local storage for data persistence
- Public API endpoints
- CORS proxy for API access

## ✨ Features Implemented

### Core Requirements
- ✅ React + TypeScript implementation
- ✅ Full name validation (first + last name)
- ✅ Age verification checkbox
- ✅ Button enabled only when form is valid
- ✅ Brewery search using Open Brewery DB API
- ✅ Add/remove favorites functionality
- ✅ Brewery cards with required information
- ✅ User name display in navbar
- ✅ Logout functionality
- ✅ React Testing Library unit tests

### Bonus Features
- ✅ Global state management (Context API)
- ✅ Cypress E2E tests
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Accessibility features
- ✅ CI/CD pipeline
- ✅ Local storage persistence

### Additional Features
- 🎨 Tailwind CSS for styling
- 🔒 Protected routes
- 📱 Mobile-responsive design
- ♿ ARIA labels and accessibility
- 🎯 TypeScript strict mode
- 📊 Test coverage reporting
- 🚀 Vercel deployment

## 🎨 Design Implementation

The application follows the provided Figma design with:
- Yellow accent color scheme
- Card-based layout for breweries
- Clean, minimal interface
- Responsive grid system
- Consistent spacing and typography

## 📝 Additional Notes

- The application persists user data and favorites in localStorage
- Form validation provides real-time feedback
- The search is case-insensitive and supports partial matches
- Cards display brewery type, postal code, and phone as badges
- The application is fully keyboard navigable
- Error boundaries handle unexpected failures gracefully

---

**Developed by**: [Filipe Batista](https://linkedin.com/in/filipebatista)  
**Timeline**: 3 days  
        