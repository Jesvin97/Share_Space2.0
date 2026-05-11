# Architecture: Share Space 2.0

## System Layers

### 1. Frontend Layer (React)
- **State Management**: React Context API (`AuthContext`) for global state like authentication.
- **Routing**: Client-side routing with React Router 7.
- **Components**: 
  - `src/components`: Reusable UI elements (Navbar, Footer, ProtectedRoute).
  - `src/pages`: Page-level components representing application routes.
- **Effects**: Lenis for smooth scroll orchestration and Framer Motion for entrance/exit animations.

### 2. Backend Layer (Vercel Serverless)
- **Directory**: `api/`
- **Modules**:
  - `api/auth`: Login and session management.
  - `api/blogs`: CRUD operations for blog posts and metadata.
  - `api/spaces`: Management of listed spaces.
- **Shared Utilities (`api/_lib`)**:
  - `db.js`: PostgreSQL connection pool and query helpers.
  - `auth.js`: JWT verification and user extraction.
  - `rateLimit.js`: Protection against API abuse.
  - `sanitize.js`: Input cleaning to prevent XSS/Injection.

### 3. Data Layer (PostgreSQL)
- **Hosted**: Vercel Postgres.
- **Schema**: Managed via SQL queries within serverless functions.
- **Persistence**: Relational storage for users, spaces, blogs, and admin configurations.

## Data Flow
1. **User Interaction**: User clicks a button or loads a page.
2. **API Request**: Frontend sends an `async fetch` request to a `/api/*` endpoint.
3. **Middleware**: API functions verify JWT (if required) and sanitize inputs.
4. **Database Operation**: API function executes SQL via `@vercel/postgres`.
5. **Response**: Data is returned as JSON and mapped to React state/UI.

## Module Structure
```
/api
  /_lib         # Shared backend logic (DB, Auth, Sanitization)
  /auth         # Auth endpoints
  /blogs        # Blog management
  /spaces       # Space management
/src
  /assets       # Static assets (images, logos)
  /components   # Generic UI components
  /context      # React Context providers
  /pages        # Route-specific components
```
