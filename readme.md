# GDG COMSATS — Website

<div align="center">

<img width="50" height="50" alt="GDG COMSATS logo" src="https://github.com/user-attachments/assets/dcae7abc-5de9-4416-961e-90c2e2f41fbb" />

**Google Developer Groups on Campus**
COMSATS University Islamabad, Lahore Campus

[Live site](https://gdgoc-cui-lahore.vercel.app) · [Community page](https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-pakistan/) · [Instagram](https://www.instagram.com/gdgoc.cuilhr/) · [LinkedIn](https://www.linkedin.com/company/gdsccuilhr) · [WhatsApp](https://chat.whatsapp.com/JFMjnJaTSZZD7gyDSSZ8ZM)

</div>

---

## About the society

GDG on Campus at COMSATS University Islamabad, Lahore Campus is a student-run developer community affiliated with Google Developer Groups. We run workshops, tech talks and hackathons, and give students a place to learn Google technologies, build projects and meet other developers on campus.

This repository contains the society's web presence:

- a **public website** for events, the team, the photo gallery, learning resources, contact and event certificates
- a **content admin panel** the core team uses to publish all of that

## Live deployments

| App | URL | Notes |
| --- | --- | --- |
| Public website | https://gdgoc-cui-lahore.vercel.app | Next.js app in `apps/landing` |
| Admin panel | https://gdgoc-cui-admin.vercel.app | Vite app in `apps/admin`; requires a Firebase Auth account |

## What's on the site

### Public pages (`apps/landing`)

| Route | Contents |
| --- | --- |
| `/` | Hero, about, events, gallery, resources and contact section |
| `/team` | Lead profile plus the current team members |
| `/contact` | Contact form (sends through EmailJS) and social links |
| `/certificates` | Attendees find themselves in an event's attendee list by email and download a generated PDF certificate |
| `/hackathon` | Standalone page for the GDG COMSATS Hackathon 2026 |

Events, gallery images, resources and team members are read from Firestore. The team lead section is still written directly in `apps/landing/src/app/team/page.tsx`.

### Admin panel (`apps/admin`)

Sign-in is email/password through Firebase Authentication. Signed-in admins can:

- see counts for events, team members, gallery images and resources on the dashboard;
- create, edit and delete **events**, **team members**, **gallery images** and **resources**;
- create certificate entries for completed events by uploading a PDF template and an `.xlsx` attendee list, or remove existing entries.

Image and file uploads go to Cloudinary.

## Tech stack

| Layer | Public site | Admin panel |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | Vite 5 |
| UI | React 19, Tailwind CSS 4 | React 18, Tailwind CSS 3 |
| Animation | GSAP, Framer Motion | Framer Motion |
| Data | Firebase Firestore | Firebase Firestore |
| Auth | — | Firebase Authentication (email/password) |
| Media | Cloudinary | Cloudinary |
| Email | EmailJS (`@emailjs/browser`) | — |
| Certificates | `pdf-lib` for PDF generation | `xlsx` for attendee imports |
| Hosting | Vercel | Vercel |
| Tooling | pnpm workspaces, TypeScript | pnpm workspaces, TypeScript, ESLint |

Firestore collections in use: `events`, `team_members`, `gallery_images`, `resources`, `event_certificates`. Access rules live in [`firestore.rules`](./firestore.rules) — public read, authenticated write.

## Local development

### Prerequisites

- **Node.js 18.18 or newer** (minimum for Next.js 15; Node 20 LTS recommended)
- **pnpm 10** — pinned as `pnpm@10.12.4` in `package.json`
- A **Firebase project** with Firestore and Authentication enabled
- A **Cloudinary account** with an unsigned upload preset (only needed for uploads in the admin panel)

### 1. Clone

```bash
git clone https://github.com/gdgcuiadmin/gdgoc-cui-website.git
cd gdgoc-cui-website
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Each app includes a `.env.example` listing every variable it needs. Copy both templates and fill in your own project values:

```bash
cp apps/landing/.env.example apps/landing/.env
cp apps/admin/.env.example apps/admin/.env
```

`.env` files are gitignored. The variables are described in [Environment variables](#environment-variables).

### 4. Run

```bash
pnpm dev            # both apps in parallel
pnpm dev:landing    # public site only  -> http://localhost:3000
pnpm dev:admin      # admin panel only  -> http://localhost:5173
```

### 5. Build and preview

```bash
pnpm --filter landing build
pnpm --filter landing start

pnpm --filter admin build
pnpm --filter admin preview
```

## Environment variables

The same nine values are needed by both apps, with different prefixes: `NEXT_PUBLIC_` for the Next.js site and `VITE_` for the Vite admin panel. Both `.env.example` files list them in this order.

| Setting | Public site (`apps/landing/.env`) | Admin panel (`apps/admin/.env`) |
| --- | --- | --- |
| Firebase API key | `NEXT_PUBLIC_FIREBASE_API_KEY` | `VITE_FIREBASE_API_KEY` |
| Auth domain | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `VITE_FIREBASE_AUTH_DOMAIN` |
| Project ID | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `VITE_FIREBASE_PROJECT_ID` |
| Storage bucket | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `VITE_FIREBASE_STORAGE_BUCKET` |
| Messaging sender ID | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `VITE_FIREBASE_MESSAGING_SENDER_ID` |
| App ID | `NEXT_PUBLIC_FIREBASE_APP_ID` | `VITE_FIREBASE_APP_ID` |
| Realtime Database URL | `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | `VITE_FIREBASE_DATABASE_URL` |
| Cloudinary cloud name | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `VITE_CLOUDINARY_CLOUD_NAME` |
| Cloudinary upload preset | `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `VITE_CLOUDINARY_UPLOAD_PRESET` |

Firebase values come from **Project settings → General → Your apps** in the Firebase console. The Cloudinary preset must allow unsigned uploads.

## Firebase setup

1. Create a Firebase project and add a web app to get the config values above.
2. Enable **Authentication → Sign-in method → Email/Password**, then create an account for each admin under **Users**. There is no public sign-up page in the admin panel.
3. Create a **Firestore** database. In production mode, no client reads or writes work until the rules are in place.
4. Copy the contents of [`firestore.rules`](./firestore.rules) into **Firestore → Rules** in the Firebase console and publish. The rules allow public reads and authenticated writes to the collections the site uses.
5. Collections are created when the first document is added — add the first entries from the admin panel or the console.

## Deployment

The public site and the admin panel are deployed as two separate Vercel projects connected to this repository. Create both from the Vercel dashboard — import the repository once per app, since the repository root itself is not a deployable app.

| Vercel project | Root directory | Build command | Output |
| --- | --- | --- | --- |
| Public website | `apps/landing` | `pnpm build` | `.next` |
| Admin panel | `apps/admin` | `pnpm build` | `dist` |

The build and install commands come from each app's `vercel.json`; leave Vercel's default framework detection and build settings in place.

### Public website

1. Import the repository and set **Root Directory** to `apps/landing`.
2. Add the `NEXT_PUBLIC_FIREBASE_*` and `NEXT_PUBLIC_CLOUDINARY_*` variables under **Settings → Environment Variables**, for the environments you deploy (Production, and Preview if you use preview builds).
3. Deploy. Vercel detects Next.js and builds with pnpm.

### Admin panel

1. Import the same repository and set **Root Directory** to `apps/admin`.
2. Add the `VITE_FIREBASE_*` and `VITE_CLOUDINARY_*` variables in **Settings → Environment Variables**.
3. Deploy. Vercel detects Vite and serves the static build from `dist`.

Both frameworks inline environment variables at build time, so changing a variable requires a new deployment of the affected project before it takes effect.

## Contributing

Contributions from society members are welcome — content fixes, UI work and bug fixes all help.

1. Open an issue (or comment on an existing one) describing the change.
2. Branch from `main` using the existing conventions: `feature/<name>`, `fix/<name>`.
3. Make the change, run the relevant build, and keep the existing component/query patterns:
   - TypeScript everywhere; functional React components;
   - Tailwind classes rather than new CSS files;
   - Firestore access through the existing helpers in `src/lib/db.ts`, not ad-hoc `getDocs` calls in components.
4. Open a pull request into `main` with a short description and screenshots for UI changes.

There is currently no automated test suite or CI workflow, so a passing local build is the check to include in the PR description:

```bash
pnpm --filter landing build
pnpm --filter admin build
pnpm --filter admin lint
```

## Contact

- **Email:** [gdsc.cuilahore@gmail.com](mailto:gdsc.cuilahore@gmail.com)
- **Location:** COMSATS University Islamabad, Lahore Campus, Raiwind
- **Community / join:** [GDG community page](https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-pakistan/) · [WhatsApp group](https://chat.whatsapp.com/JFMjnJaTSZZD7gyDSSZ8ZM)
- **Social:** [Instagram](https://www.instagram.com/gdgoc.cuilhr/) · [LinkedIn](https://www.linkedin.com/company/gdsccuilhr)
- **Bugs and feature requests:** open an issue on [GitHub](https://github.com/gdgcuiadmin/gdgoc-cui-website/issues)

<div align="center">

Maintained by the GDG COMSATS web team.

</div>
