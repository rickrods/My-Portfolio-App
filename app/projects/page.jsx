import { Suspense } from "react";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { getPrimaryUser, getProjectsPageData, getSecondaryUser } from "../data";
import { Article } from "./article";

const ProjectCard = ({ project }) => (
	<Card>
		<Article project={project} />
	</Card>
);

const ProjectsList = async ({ username }) => {
	const { heroes, sorted } = await getProjectsPageData(username);
	const allProjects = [...heroes, ...sorted];

	return (
		<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
			{allProjects.map((project) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</div>
	);
};

export default async function ProjectsPage({ searchParams }) {
	const { customUsername } = await searchParams;
	const primaryUser = await getPrimaryUser();
	const secondaryUser = await getSecondaryUser();
	const primaryUsername =
		primaryUser?.login || process.env.GITHUB_USERNAME || "testuser";
	const secondaryUsername =
		secondaryUser?.login || process.env.SECONDARY_GITHUB_USERNAME || "testuser";

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Projects
					</h2>
					<p className="mt-4 text-zinc-400">
						Some of the projects are from work and some are on my own time.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />
				<Suspense fallback={<div>Loading projects...</div>}>
					{customUsername ? (
						<div className="space-y-8">
							<h3 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
								{customUsername}
							</h3>
							<ProjectsList username={customUsername} />
						</div>
					) : (
						<>
							<div className="space-y-8">
								<h3 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
									{primaryUsername}
								</h3>
								<ProjectsList username={primaryUsername} />
							</div>
							<div className="w-full h-px bg-zinc-800 mt-16" />
							<h3 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
								{secondaryUsername}
							</h3>
							<ProjectsList username={secondaryUsername} />
						</>
					)}
				</Suspense>
			</div>
		</div>
	);
}
