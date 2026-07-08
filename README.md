# My Portfolio Application

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fyour-repo-name&env=GH_TOKEN,VC_TOKEN)

A personal portfolio website built with the latest versions of [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) and deployed to [Vercel](https://vercel.com/). It automatically pulls your GitHub repositories, deployment details, and profile information into a polished landing page.

## 🧰 Tech stack
- **Framework**: [Next.js](https://nextjs.org/) 16.2.10
- **Runtime**: [Node.js](https://nodejs.org/) 24.x
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4.3.1
- **UI**: [React](https://react.dev/) 19.2.7
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) 5.7.0


## ⭐ Features
- Displays your GitHub profile, organizations, and repositories for one or two linked accounts
- Resolves the active GitHub usernames from personal access tokens in [.env.local](.env.local), so sensitive profile values are no longer stored in public config
- Supports a secondary account with its own description, featured repositories, and hidden repositories
- Shows project stats, traffic data, and security alerts when available
- Includes Vercel deployment information and framework detection
- Supports a simple search experience for browsing other GitHub users

## 💻 Running locally

1. Clone the repository and navigate into the directory:

```sh
git clone https://github.com/rickrods/My-Portfolio-App.git
cd My-Portfolio-App
```

Add your tokens to [.env.local](.env.local):

```sh
# Required for build-time GitHub data requests
GH_TOKEN=YOUR_GH_TOKEN

# Optional, enables a secondary GitHub profile and repository set
SECONDARY_GH_TOKEN=YOUR_SECONDARY_GH_TOKEN

# Optional for Vercel deployment information
VC_TOKEN=YOUR_VERCEL_TOKEN
```

`GH_TOKEN` is required for the app to build and run successfully. `SECONDARY_GH_TOKEN` is optional and enables the secondary account experience.

#### 📝 Configuration
- The app retrieves the GitHub usernames, avatars, display names, and bio from the github api using the configured github personal access token environment variables.
- The app will retrieve the bio from the github account and use this if `description` and `secondaryDescription` are null. If `description` and `secondaryDescription` are filled in the application will use this data instead of the github bio.
- Use `projects` and `secondaryProjects` to feature certain repositories and hide others from the portfolio.

```json
{
  "description": "Description for the primary GitHub account",
  "projects": {
    "blacklist": ["repo-to-hide-1", "repo-to-hide-2"],
    "heroNames": ["featured-repo-1", "featured-repo-2"]
  },
  "secondaryDescription": "Description for the secondary GitHub account",
  "secondaryProjects": {
    "blacklist": ["secondary-repo-to-hide-1"],
    "heroNames": ["secondary-featured-repo-1"]
  }
}
```

#### Contact Form
Secured by Cloudflare Turnstile
Use the Site key to integrate the client-side rendering widget on your website and the Secret key to validate responses on your server
.

#### ▶️ Run the app
Then install dependencies and start the development server:

```sh
npm install
npm run dev
```

## 🚀 Deploying to Vercel

1. Push this repository to GitHub.
2. Import it in Vercel.
3. Add the same environment variables in the Vercel project settings.
4. Deploy.
