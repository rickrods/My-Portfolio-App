/** @type {import('next').NextConfig} */
const resolveGitHubUsernameFromToken = async (token, fallback = "testuser") => {
	if (!token) {
		return fallback;
	}

	try {
		const response = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `token ${token}`,
				Accept: "application/vnd.github+json",
			},
			next: {
				tags: ["github", "github-username"],
			},
		});
		const data = await response.json();
		return data.login || fallback;
	} catch {
		return fallback;
	}
};

const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	// Note: cacheComponents: true is not compatible with this application
	// because we use searchParams for dynamic user selection throughout the app.
	// The unstable_cache wrappers in app/data.js provide caching benefits instead.
	experimental: {
		// Caching all page.jsx files on the client for 5 minutes.
		// Resulting in immediate navigation and no loading time.
		staleTimes: {
			dynamic: 300,
			static: 300,
		},
	},
	env: {
		/** GitHub usernames loaded in build time from the configured access tokens. */
		GITHUB_USERNAME: await resolveGitHubUsernameFromToken(
			process.env.GH_TOKEN,
			"testuser",
		),
		SECONDARY_GITHUB_USERNAME: await resolveGitHubUsernameFromToken(
			process.env.SECONDARY_GH_TOKEN,
			"testuser",
		),
	},
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "**.githubusercontent.com" },
			{ protocol: "https", hostname: "**.github.com" },
		],
	},
};

export default nextConfig;
