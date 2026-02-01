# Smart School Management Website

Next.js (App Router, JavaScript) + Tailwind + PostgreSQL (Prisma) + NextAuth (Credentials) + Nodemailer notifications.

## Features

- Public website: home, about, notices, events, contact
- Role dashboards: Admin / Teacher / Student / Parent
- Attendance, results (publish + email notifications)
- Homework, study materials, class videos
- Timetable uploads + secure downloads (RBAC + class access)
- Email templates/logging + notification settings in DB

## Quickstart (Local)

1) Install dependencies

```bash
npm install
```

2) Create `.env`

```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/college_web?schema=public"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"

# Optional: email (Nodemailer)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="no-reply@example.com"
SMTP_PASS="password"

MAIL_FROM="Smart School <no-reply@example.com>"
MAIL_REPLY_TO="support@example.com"

# Optional: override seeded admin credentials
ADMIN_EMAIL="admin@school.local"
ADMIN_PASSWORD="Admin123!"
```

3) Migrate + seed

```bash
npx prisma migrate dev
npx prisma db seed
```

4) Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Default Admin Login

Seed creates an admin (override via `ADMIN_EMAIL` / `ADMIN_PASSWORD`):

- Email: `admin@school.local`
- Password: `Admin123!`

## Storage Notes (Vercel-friendly)

- Homework/material uploads can store attachments in Postgres as `Bytes` (max ~4MB).
- Timetable uploads are stored as `UploadedFile.bytes` and served via a secure download endpoint.

## Deploy to Vercel

1) Create a Postgres DB (Neon/Supabase/Railway/etc) and set `DATABASE_URL`.

2) Set required env vars:

- `DATABASE_URL`
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`

3) Optional SMTP vars (for email notifications):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- `MAIL_FROM`, `MAIL_REPLY_TO`

4) Recommended Vercel Build Command:

```bash
npx prisma generate && npx prisma migrate deploy && next build
```

5) Seed once (run locally against the production DB or via a one-off CI job):

```bash
npx prisma db seed
```

## Useful Commands

```bash
npx prisma studio
npm run lint
npm run build
```
