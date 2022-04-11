This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

**Note**: Install [pnpm package manager](https://pnpm.io/installation).

Install all dependencies

```bash
pnpm i
```

First, run the development server:

```bash
pnpm run dev
```

## Setup Husky

```bash
pnpm husky install
```

## Setting up Env variables

Create `.env.local` file in the root and copy below code into it. Then replace the values for your corresponding firebase account

```
NEXT_PUBLIC_FIREBASE_API_KEY=XXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=XXX
NEXT_PUBLIC_FIREBASE_PROJECT_ID=XXX
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=XXX
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=XXX
NEXT_PUBLIC_FIREBASE_APP_ID=XXX
```
