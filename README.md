# Vistar Cabs

Vistar Cabs is a cab enquiry website focused on Nashik and journeys across Maharashtra. Visitors can explore city, airport, destination and route information, then send a trip enquiry. The project includes a Next.js website, an Express API, MongoDB storage, and a role-based admin area.

## What is included

- Responsive homepage with trip enquiry form, services, Kumbh Mela information, cities, airports, destinations, customer feedback, popular routes and FAQs.
- Information pages for cities, airports, destinations, services, blogs and routes.
- Enquiry form for Outstation, Airport, Hourly and Corporate trips. It collects trip and callback details, saves the enquiry to MongoDB, and then opens a prefilled WhatsApp message for the customer to send.
- Admin area at `/admin` for enquiries, website pages, SEO, media, reviews, settings and other role-appropriate tools.
- SEO editor account for website content and search metadata.

## Technologies and dependencies

- **Website:** Next.js 15, React 19, TypeScript and Tailwind CSS 4.
- **Icons:** lucide-react.
- **API:** Node.js, Express, TypeScript and Zod validation.
- **Database:** MongoDB through Mongoose.
- **Security and requests:** Helmet, CORS and express-rate-limit.
- **Code checks:** ESLint, TypeScript and Prettier; Playwright is included for browser checks.

Dependencies are listed in `frontend/package.json` and `backend/package.json`. Their matching lock files keep installs consistent. Install them with `npm install` in each folder.

## Run locally

You need Node.js and npm, plus a reachable MongoDB database. Open two terminals in the project folder.

### 1. Configure the API

Copy `backend/.env.example` to `backend/.env`. Put your private MongoDB connection string and unique admin credentials in `backend/.env`. Do not share or include this file in a ZIP.

```bash
cd backend
npm install
npm run dev
```

The API listens on port 5000. Check `http://localhost:5000/api/health`; a healthy response says `"ok":true` and `"storage":"mongodb"`.

### 2. Configure and run the website

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`. To check on a phone connected to the same Wi-Fi, start Next.js with `npm run dev -- --hostname 0.0.0.0`, then open the computer's local network address with `:3000` on the phone. Keep both terminals running.

## Environment files

- `backend/.env.example` lists API, MongoDB and admin settings. Copy it to `backend/.env` and fill in your own private values.
- `frontend/.env.example` lists public website settings such as the website address and contact links. Copy it to `frontend/.env.local` when you need to change them.
- Never put MongoDB credentials or admin passwords in the frontend environment.

## Useful pages

- Homepage: `/`
- Admin sign-in: `/admin`
- Health check: `http://localhost:5000/api/health`
- Visitor instructions: [Website visitor guide](docs/WEBSITE_USER_GUIDE.md)
- Owner admin instructions: [Admin panel guide](docs/ADMIN_PANEL_GUIDE.md)
- SEO editor instructions: [SEO editor guide](docs/SEO_EDITOR_GUIDE.md)

## Checks before a demo

Start both services, check the health page, open the homepage and a few city/airport pages, test the enquiry form with a clearly labelled test entry, and confirm it appears in Admin → Inquiries. A successful enquiry is saved in MongoDB before WhatsApp opens. The customer still needs to tap Send in WhatsApp. Review the site on a phone as well as a laptop.

Run code checks from `frontend` with `npm run lint` and `npx tsc --noEmit --incremental false`. The Playwright suite can be run with `npm run test:e2e`. Build the API from `backend` with `npm run build`.

## Project folders

```text
backend/   Express API, MongoDB models, authentication and admin/public APIs
frontend/  Next.js pages, components, styles, images and browser checks
docs/      Website, owner admin and SEO editor guides
```

## Important

Do not publish real customer records, database credentials or admin passwords in the ZIP. Customer reviews must be genuine and approved for display. Confirm contact details, policies and business claims with the owner before public launch.
