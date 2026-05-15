## Project Memory
Share Space 2.0 is a **premium discovery and listing platform** focused on high-end, diverse spaces in **South India**. The niche covers curated coworking hubs, event venues, and creative studios.

The platform tells a story of seamless connectivity and premium aesthetics, bridging property owners and creative professionals through a minimalist, motion-rich interface.

### Niche & Engagement
- **Market**: Premium spaces in South India (Coworking, Studios, Events).
- **Selling Point**: Curated, high-end user experience with smooth interactions.
- **Contact**: Primary engagement for owners is via direct **WhatsApp Web integration** for instant listing onboarding.

## Tech Stack
- **Frontend**: 
  - **Framework**: React 19 (Vite)
  - **Routing**: React Router 7
  - **Animations**: Framer Motion
  - **Smooth Scrolling**: Lenis
  - **Icons**: Lucide React
- **Backend**: 
  - **Infrastructure**: Vercel Serverless Functions (Node.js)
  - **Database**: Vercel Postgres (SQL)
  - **Auth**: JWT (JSON Web Tokens) with `bcryptjs` for security
- **Styling**: Vanilla CSS (Modern, premium aesthetic)

## Core Flows
1. **Discovery**: Users browse spaces via the `/spaces` route, filtered by categories.
2. **Engagement**: Users read SEO-optimized content in the `/blogs` section.
3. **Listing**: Owners can list their properties via `/list-space`.
4. **Administration**: Secured access to `/portal-manager` for managing blogs, spaces, and platform settings.
5. **Security**: Protected routes via `ProtectedRoute` component and JWT-based API validation.

## Key Dependencies
- `react`, `react-dom` (v19)
- `react-router-dom` (v7)
- `framer-motion`
- `@vercel/postgres`
- `jsonwebtoken`, `bcryptjs`
- `@studio-freight/lenis`
