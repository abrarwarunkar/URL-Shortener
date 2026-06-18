# URL Shortener Frontend - Source Directory

This directory contains the Next.js frontend application for the URL Shortener service.

## Directory Structure

```
src/
├── app/                      # Next.js app directory (routes)
│   ├── layout.tsx            # Root layout with providers
│   ├── page.tsx              # Dashboard page (/)
│   ├── error.tsx             # Global error boundary
│   ├── analytics/
│   │   └── [shortCode]/
│   │       └── page.tsx      # Analytics page
│   └── api/
│       └── health.ts         # Health check endpoint
│
├── components/               # React components
│   ├── common/               # Reusable components
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Toast.tsx
│   │   ├── CopyButton.tsx
│   │   └── Breadcrumb.tsx
│   ├── dashboard/            # Dashboard feature components
│   │   ├── UrlForm.tsx
│   │   ├── UrlTable.tsx
│   │   ├── UrlRow.tsx
│   │   └── EmptyState.tsx
│   ├── analytics/            # Analytics feature components
│   │   ├── AnalyticsMetrics.tsx
│   │   ├── ClicksTable.tsx
│   │   ├── AnalyticsHeader.tsx
│   │   └── Breadcrumb.tsx
│   └── modals/               # Modal/dialog components
│       ├── ConfirmDeleteModal.tsx
│       └── ErrorModal.tsx
│
├── hooks/                    # Custom React hooks
│   ├── useUrls.ts
│   ├── useAnalytics.ts
│   ├── useRateLimit.ts
│   ├── useClipboard.ts
│   └── useLocalStorage.ts
│
├── store/                    # Zustand state stores
│   ├── urlStore.ts           # URL management store
│   ├── authStore.ts          # Authentication store
│   └── uiStore.ts            # UI state store
│
├── services/                 # Business logic and services
│   ├── api/
│   │   ├── client.ts         # Axios client configuration
│   │   ├── urlApi.ts         # URL API service
│   │   ├── analyticsApi.ts   # Analytics API service
│   │   └── interceptors.ts   # Request/response interceptors
│   ├── validation/
│   │   ├── urlValidator.ts   # URL format validation
│   │   └── typeGuards.ts     # TypeScript type guards
│   └── clipboard/
│       └── clipboardService.ts  # Clipboard API service
│
├── types/                    # TypeScript type definitions
│   ├── api.ts                # API request/response types
│   ├── domain.ts             # Domain models
│   ├── errors.ts             # Error types
│   └── ui.ts                 # UI state types
│
├── utils/                    # Utility functions
│   ├── formatters.ts         # Data formatting utilities
│   ├── timeUtils.ts          # Time/date utilities
│   ├── errorHandler.ts       # Error handling utilities
│   ├── retry.ts              # Retry logic utilities
│   └── authUtils.ts          # Auth utilities
│
├── config/                   # Application configuration
│   ├── environment.ts        # Environment variables
│   ├── api.config.ts         # API configuration
│   └── constants.ts          # Application constants
│
├── middleware/               # Next.js middleware
│   └── auth.ts               # Authentication middleware
│
├── lib/                      # Library functions
│   ├── queryClient.ts        # React Query configuration
│   └── virtualizer.ts        # Virtual list utilities
│
└── styles/                   # Global styles
    └── globals.css           # Tailwind CSS globals
```

## Key Principles

### Architecture Layers

1. **Presentation Layer** - React components with TypeScript
2. **State Management** - Zustand stores for global state
3. **API Integration** - Axios client with interceptors
4. **Services** - Business logic separation
5. **Configuration** - Environment-based configuration

### Type Safety

- Full TypeScript strict mode
- Type guards for API responses
- Domain models for data consistency
- Runtime validation of API contracts

### Error Handling

- Centralized error handler utility
- User-friendly error messages
- Error recovery strategies
- Safe error logging without sensitive data

### Performance

- Code splitting with lazy loading
- List virtualization for large datasets
- Request debouncing
- Cache strategy for API responses
- Image optimization

### State Management Strategy

- **Zustand** for global state (stores)
- **localStorage** for rate limit expiry
- **In-memory** for transient UI state
- HTTP-only cookies for authentication (backend managed)

## Development Guidelines

### Creating Components

- Use functional components with hooks
- Keep components focused and reusable
- Add JSDoc comments for component props
- Use TypeScript interfaces for props
- Test with unit and integration tests

### Creating Stores

- Define state interface clearly
- Implement state actions as separate functions
- Keep store logic focused
- Document state shape and actions

### Creating Services

- Separate business logic from components
- Use dependency injection for testing
- Add error handling at service level
- Document service interfaces

### Creating Utilities

- Write pure functions where possible
- Add comprehensive JSDoc comments
- Include unit tests
- Consider edge cases

### Type Definitions

- Define types near where they're used
- Keep types focused and specific
- Add JSDoc comments explaining types
- Use type guards for runtime validation

## Testing

- Unit tests in `.test.ts` files
- Property-based tests using fast-check
- Integration tests for API interactions
- E2E tests for user workflows

## Building and Deployment

```bash
# Development
npm run dev        # Start dev server on port 3000

# Type checking
npm run type-check # Check TypeScript

# Linting
npm run lint       # Run ESLint

# Formatting
npm run format     # Format with Prettier

# Building
npm run build      # Create production build
npm start          # Start production server
```

## Environment Variables

See `.env.local.example` for required environment variables.

## Related Documentation

- **Design Document**: Contains complete architecture and specifications
- **Tasks Document**: Implementation tasks and acceptance criteria
- **Backend API**: Documented at http://localhost:8080/api/docs (when running)
