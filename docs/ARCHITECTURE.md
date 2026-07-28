# Licarl Phone — Architecture

## Layers

Presentation (React) → Application (Express) → Domain (shared types) → Infrastructure (Prisma, SMS providers, Redis)

## Multi-provider SMS

All SMS goes through `SmsProvider` (Twilio, Vonage, Telnyx, MessageBird, Infobip) with automatic failover via `sendSmsWithFailover()`.

Webhooks: `/api/webhooks/{twilio|vonage|telnyx|messagebird|infobip}` with signature validation.

## Security

JWT access/refresh, bcrypt, Helmet, rate limits, AES-256-GCM for secrets, audit logs, RBAC.

## Deploy

Web → Vercel | API + Postgres → Railway/Docker | CI → GitHub Actions
