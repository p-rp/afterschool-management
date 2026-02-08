# Start Jr. Dashboard

React frontend for Start Jr. application.

## Setup

```bash
cd apps/dashboard
pnpm install
cp .env.example .env
pnpm dev
```

Server: http://localhost:5173

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm lint       # Run ESLint
```

## Structure

```
src/
├── components/   # React components
├── pages/       # Page components
├── services/    # API client services
└── utils/       # Helper functions
```

## Features

- Dashboard with statistics and activity feed
- User management interface
- Authentication flow
- Responsive layout with Tailwind CSS

## Tech Stack

React 19, TypeScript, React Router 7, Tailwind CSS 4, Vite, Lucide Icons
