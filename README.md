# Licarl Phone — Second Phone Number SaaS

Enterprise virtual phone number platform with multi-provider SMS (Twilio, Vonage, Telnyx, MessageBird, Infobip).

## Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Zustand, TanStack Query
- **Backend:** Node.js, Express, Prisma, PostgreSQL, Socket.io, JWT
- **SMS:** Production adapters for Twilio, Vonage, Telnyx, MessageBird, Infobip with failover
- **Deploy:** Docker, Vercel, Railway ready

## Quick Start

```bash
npm install
docker compose -f docker/docker-compose.yml up -d postgres
cp apps/api/.env.example apps/api/.env
npm run db:generate && npm run db:push
npm run dev --workspace=@licarl/api
npm run dev --workspace=@licarl/web
```

## Structure

```
apps/web          React frontend
apps/api          Express API + SMS providers + webhooks
packages/database Prisma schema
packages/shared   Shared types
docker/           Compose + Dockerfile
docs/             Architecture
```

## Features

- Auth (register/login/2FA/OAuth scaffolding/password reset)
- Virtual number marketplace & lifecycle
- Real-time SMS messaging
- Multi-provider SMS with automatic failover
- Signed webhooks
- Delivery reports & analytics
- Admin dashboard
- AES-256 encryption for secrets

See `docs/ARCHITECTURE.md` for details.
