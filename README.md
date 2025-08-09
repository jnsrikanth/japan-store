# Nippon Finds — Japan Store

A modern, kawaii-inspired Japanese e-commerce storefront built with Next.js 15, Tailwind CSS v4, and TypeScript. Mirrors UX patterns from the coffee-bean-store with a Japanese visual language.

## Tech
- Next.js 15 (App Router)
- Tailwind CSS v4
- SWR for data fetching
- Simple in-memory product API
- UPI QR checkout (client-side) stub

## Local development
1. Install deps
   npm install
2. Configure env (optional for UPI):
   cp .env.example .env.local
   # edit values
3. (Optional) Import real product images and catalog from approved sources
   - Edit src/data/catalog.source.json and paste product details with remoteImageUrl from Takaski (or other approved sources).
   - Run: npm run sync:images
   - This downloads images into public/products/ and writes src/data/products.json.
4. Run
   npm run dev

## Environment variables
- NEXT_PUBLIC_UPI_ID=your-upi-id@bank
- NEXT_PUBLIC_UPI_NAME=Nippon Finds

## Deploying to Vercel
- Install Vercel CLI:
  npm i -g vercel
- Login (this opens a browser; approve there):
  vercel login
- From project root, deploy (first time will guide you to create a new project):
  vercel
  # then
  vercel --prod

## GitHub
- Initialize git and push to GitHub (recommended):
  git init -b main
  git add .
  git commit -m "feat: initial Nippon Finds storefront"
  # Create a repo on GitHub (via gh or web UI), then add remote and push
  git remote add origin https://github.com/<your-username>/japan-store.git
  git push -u origin main

