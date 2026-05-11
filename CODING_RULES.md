# Coding Rules: Share Space 2.0

## Naming Conventions
- **React Components**: PascalCase (e.g., `AdminDashboard.jsx`).
- **Functions & Variables**: camelCase (e.g., `fetchSpacesData`).
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`).
- **CSS Classes**: kebab-case (e.g., `hero-section`).
- **Files**: 
  - Components: PascalCase.
  - Utilities/Hooks: camelCase.

## Patterns & Best Practices
- **Functional Components**: Use only functional components with Hooks.
- **State Management**: Use `useState` for local state, `useContext` for global state (Auth).
- **Effect Management**: Keep `useEffect` hooks focused. Cleanup timers or listeners.
- **API Calls**: Wrap API calls in `try-catch` blocks. Use loading states for UI feedback.
- **Security**: 
  - Never store sensitive data in local storage (except tokens if necessary).
  - Always sanitize user inputs on the backend before DB insertion.
  - Use `ProtectedRoute` for any admin-level views.

## Formatting Rules
- **Indentation**: 2 spaces.
- **Quotes**: Single quotes for JS, double quotes for JSX attributes.
- **Semicolons**: Always include them to avoid ambiguity.
- **Imports**: Group imports (React, External Libraries, Local Components, Styles).

## UI/UX Principles
- **Aesthetics**: Maintain a premium, high-end feel. Use smooth transitions.
- **Responsiveness**: All pages must be mobile-friendly.
- **Animations**: Use Framer Motion for subtle entry animations (staggered children, fade-ins).
