import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import data from "../data.json";
import { Navigation } from "./components/nav";
import { ProfileOrganizations } from "./components/orgs";
import { CopilotActivity, RecentActivity } from "./components/recent-activity";
import { getPrimaryUser, getSecondaryUser, getUser } from "./data";

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
			src={user.avatar_url || "/favicon.ico"}
			className="float-right rounded-full mx-4"
		/>
	);
};

const UserText = async ({ promise, fallbackName, description }) => {
	const user = await promise;

	return (
		<p>
			Hi, my name is {user.name || user.login || fallbackName || "Developer"}
			{". "}
			{description || user.bio}
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
	const primaryUser = customUsername
		? await getUser(customUsername)
		: await getPrimaryUser();
	const username =
		customUsername ||
		primaryUser?.login ||
		process.env.GITHUB_USERNAME ||
		"testuser";
	const primaryUserPromise = Promise.resolve(primaryUser ?? {});

	let secondaryUserPromise;
	let secondaryUsername = "";
	if (!customUsername) {
		const secondaryUser = await getSecondaryUser();
		secondaryUsername =
			secondaryUser?.login || process.env.SECONDARY_GITHUB_USERNAME || "";
		if (secondaryUsername) {
			secondaryUserPromise = Promise.resolve(secondaryUser ?? {});
		}
	}

	return (
		<div className="flex flex-col items-center justify-center w-screen min-h-screen overflow-y-auto bg-linear-to-tl from-black via-zinc-600/20 to-black">
			<Navigation />
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

			<div className="flex flex-col items-center justify-center gap-8 my-16 text-center animate-fade-in">
				<Link href={`/projects?customUsername=${username}`}>
					<h1 className="flex items-center z-10 text-4xl hover:scale-110 text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text bg-white p-5">
						{username}
						<Suspense fallback={<p>Loading...</p>}>
							<UserIcon promise={primaryUserPromise} />
						</Suspense>
					</h1>
				</Link>
				<h2 className="text-lg text-zinc-500">
					<Suspense
						fallback={<div className="w-full h-px min-h-8">Loading...</div>}
					>
						<UserText
							promise={primaryUserPromise}
							fallbackName={username}
							description={data.description}
						/>
						<ProfileOrganizations username={username} />
						<RecentActivity username={username} />
						<CopilotActivity username={username} />
					</Suspense>
				</h2>
				{secondaryUserPromise && (
					<>
						<div className="hidden w-screen h-px animate-glow md:block animate-fade-in bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
						<Link href={`/projects?customUsername=${secondaryUsername}`}>
							<h1 className="flex items-center z-10 text-4xl hover:scale-110 text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text bg-white p-5">
								{secondaryUsername}
								<Suspense fallback={<p>Loading...</p>}>
									<UserIcon promise={secondaryUserPromise} />
								</Suspense>
							</h1>
						</Link>
						<h2 className="text-lg text-zinc-500">
							<Suspense
								fallback={<div className="w-full h-px min-h-8">Loading...</div>}
							>
								<UserText
									promise={secondaryUserPromise}
									fallbackName={secondaryUsername}
									description={data.secondaryDescription}
								/>
								<ProfileOrganizations username={secondaryUsername} />
								<RecentActivity username={secondaryUsername} />
								<CopilotActivity username={secondaryUsername} />
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
