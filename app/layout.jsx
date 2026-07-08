import "../global.css";
import { Analytics } from "@vercel/analytics/next";
import LocalFont from "next/font/local";
import { getPrimaryUser } from "./data";

export async function generateMetadata() {
	const primaryUser = await getPrimaryUser();
	const username =
		primaryUser?.login || process.env.GITHUB_USERNAME || "testuser";
	const displayName = primaryUser?.name || username;

	return {
		title: {
			default: "Software Development Portfolio",
		},
		description: `GitHub portfolio for ${displayName}`,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		icons: [
			{
				url: "/favicon.ico",
				rel: "icon",
				sizes: "any",
				type: "image/svg+xml",
			},
		],
	};
}
const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={calSans.variable}>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : ""
				}`}
			>
				<Analytics />

				{children}
			</body>
		</html>
	);
}
