import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import data from "../data.json";
import { Navigation } from "./components/nav";
import { ProfileOrganizations } from "./components/orgs";
import { CopilotActivity, RecentActivity } from "./components/recent-activity";
import { getUser } from "./data";

export default async function Home(props) {
	const searchParams = await props.searchParams;

	return <LandingComponent searchParams={searchParams} />;
}

const UserIcon = async ({ promise }) => {
	const user = await promise;

	return (
		<Image
			alt="👨‍💻"
			width={100}
			height={100}
			src={user.avatar_url || data.avatarUrl}
			className="float-right rounded-full mx-4"
		/>
	);
};

const UserText = async ({ promise }) => {
	const user = await promise;

	return (
		<p>
			Hi, my name is {user.name || data.displayName}
			{". "}
			{user.bio}
		</p>
	);
};

const _TryYourself = ({ customUsername }) => {
	const href = customUsername ? "/" : "/search";

	return (
		<Link
			href={href}
			className="text-lg duration-500 text-zinc-500 hover:text-zinc-300 border-dashed p-2 rounded-sm border-2 border-zinc-500 hover:border-zinc-300"
		>
			{customUsername
				? `Showing: ${customUsername}, click to cancel ❌`
				: "Try yourself"}
		</Link>
	);
};

const LandingComponent = async ({ searchParams: { customUsername } }) => {
	const username = customUsername || data.githubUsername;
	const primaryUser = await getUser(username);
	const primaryUserPromise = Promise.resolve(primaryUser);

	let secondaryUserPromise;
	if (!customUsername && data.secondaryGithubUsername) {
		secondaryUserPromise = getUser(data.secondaryGithubUsername); // This will now run after the primary user fetch completes
	}

	return (
		<div className="flex flex-col items-center justify-center w-screen min-h-screen overflow-y-auto bg-linear-to-tl from-black via-zinc-600/20 to-black">
			<Navigation />
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

			<div className="flex flex-col items-center justify-center gap-8 my-16 text-center animate-fade-in">
				<h1 className="flex items-center z-10 text-4xl hover:scale-110 text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text bg-white p-5">
					{username}
					<Suspense fallback={<p>Loading...</p>}>
						<UserIcon promise={primaryUserPromise} />
					</Suspense>
				</h1>
				<h2 className="text-lg text-zinc-500">
					<Suspense
						fallback={<div className="w-full h-px min-h-8">Loading...</div>}
					>
						<UserText promise={primaryUserPromise} />
						<ProfileOrganizations username={username} />
						<RecentActivity username={username} />
						<CopilotActivity username={username} />
					</Suspense>
				</h2>
				{secondaryUserPromise && (
					<>
						<div className="hidden w-screen h-px animate-glow md:block animate-fade-in bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
						<h1 className="flex items-center z-10 text-4xl hover:scale-110 text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text bg-white p-5">
							{data.secondaryGithubUsername}
							<Suspense fallback={<p>Loading...</p>}>
								<UserIcon promise={secondaryUserPromise} />
							</Suspense>
						</h1>
						<h2 className="text-lg text-zinc-500">
							<Suspense
								fallback={<div className="w-full h-px min-h-8">Loading...</div>}
							>
								<UserText promise={secondaryUserPromise} />
								<ProfileOrganizations username={data.secondaryGithubUsername} />
							</Suspense>
						</h2>
					</>
				)}
			</div>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="my-16 text-center animate-fade-in">
				<h2 className="text-lg text-zinc-500">
					<Suspense
						fallback={<div className="w-full h-px min-h-28">Loading...</div>}
					>
						<div className="flex flex-col gap-8"></div>
					</Suspense>
				</h2>
			</div>
		</div>
	);
};
