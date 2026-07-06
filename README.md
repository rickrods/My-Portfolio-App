# My GitHub Portfolio

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fyour-repo-name&env=GH_TOKEN,VC_TOKEN)

A personal portfolio website built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) and deployed to [Vercel](https://vercel.com/). It automatically pulls your GitHub repositories, deployment details, and profile information into a polished landing page.

## Tech stack
- **Framework**: [Next.js](https://nextjs.org/) 16.2.10
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4.3.1
- **UI**: [React](https://react.dev/) 19.2.6
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) 5.7.0
- **Node.js**: 24.x

## Features
- Displays your GitHub profile, organizations, and repositories
- Shows project stats, traffic data, and security alerts when available
- Includes Vercel deployment information and framework detection
- Supports a simple search experience for browsing other GitHub users

## Running locally

```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Environment variables
Create a local environment file from [.env.example](.env.example):

```sh
cp .env.example .env.local
```

Add your tokens to [.env.local](.env.local):

```sh
# Required for build-time GitHub data requests
GH_TOKEN=YOUR_GH_TOKEN

# Optional for Vercel deployment information
VC_TOKEN=YOUR_VERCEL_TOKEN
```

`GH_TOKEN` is required for the app to build and run successfully.

Then install dependencies and start the development server:

```sh
npm install
npm run dev
```

Edit [data.json](data.json) to personalize the site with your own information.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it in Vercel.
3. Add the same environment variables in the Vercel project settings.
4. Deploy.
