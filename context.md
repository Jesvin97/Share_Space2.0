## Niche & Story
Share Space 2.0 is a **premium discovery and listing platform** specifically focused on high-end, diverse spaces in **South India**. Our niche covers coworking hubs, event venues, and creative studios that demand a sophisticated presentation.

The platform tells a story of seamless connectivity and premium aesthetics. We don't just list spaces; we curate a high-end user experience where finding the perfect creative or professional environment feels as premium as the spaces themselves. Our focus is on bridging the gap between property owners and creative professionals through a minimalist, motion-rich interface.

## Contact & Engagement
- **For Owners**: Listing is simplified through a direct **WhatsApp Web integration**, allowing property owners to start the onboarding process instantly.
- **For Users**: Discovery is facilitated by a smooth, SEO-optimized browsing experience with direct paths to detailed space information.
- **Support**: Managed through the admin portal and direct communication channels.

## Tech Stack
- **Frontend**: React 19 (Vite), React Router 7, Framer Motion, Lenis (smooth scrolling).
- **Backend**: Vercel Serverless Functions (Node.js).
- **Database**: Vercel Postgres (SQL).
- **Auth**: JWT with bcryptjs.
- **Styling**: Vanilla CSS (Modern, premium aesthetic).

---

## AI Chatbot System Requirements
The goal is to add a production-ready AI chatbot system with the following specifications:

### Core Technology
- **Model**: OpenAI GPT-4o-mini (responses), text-embedding-3-small (embeddings).
- **Architecture**: Retrieval Augmented Generation (RAG) using a PDF-based knowledge base.
- **Caching & Rate Limiting**: Upstash Redis.
- **Infrastructure**: Vercel Serverless/API routes.

### Key Features
- **Knowledge Base**:
  - Ingest 3-page PDF, extract text, chunk efficiently.
  - Store embeddings in a lightweight vector store.
  - Retrieve only relevant chunks per query.
- **Chat System**:
  - Concise streaming responses.
  - Fallback logic for missing information.
  - Optional lightweight conversation context.
- **Redis Integration**:
  - Semantic/similar-question caching.
  - TTL-based expiration to reduce API calls.
  - Cache hit rate tracking.
- **Security & Protection**:
  - IP-based rate limiting (sliding window/token bucket).
  - Protection against prompt injection and system prompt leakage.
  - Input validation/sanitization and request size limits.
  - Timeout handling and CORS configuration.
- **Cost Control**:
  - Real-time token usage and cost estimation.
  - Running usage totals with a $1 threshold alert.
  - Auto-disable feature when threshold is exceeded.

### Implementation Standards
- **Modular & Clean Architecture**: Reusable components, minimal dependencies, and optimized for Vercel deployment.
- **Performance**: Very low operational cost, high scalability, and minimal token usage.
- **Security**: Environment variables for all API keys, no exposed internal details.
