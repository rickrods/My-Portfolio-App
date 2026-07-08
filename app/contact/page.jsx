import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoMail, GoPerson } from "react-icons/go";
import { Card } from "../components/card";
import ContactForm from "../components/contact-form"; // Client component
import { Navigation } from "../components/nav";
import { getPrimaryUser, getSocialAccounts, getUser } from "../data";

export default async function Contacts(props) {
	const searchParams = await props.searchParams;
	const { customUsername } = searchParams;

	const primaryUser = await getPrimaryUser();
	const username =
		customUsername ||
		primaryUser?.login ||
		process.env.GITHUB_USERNAME ||
		"testuser";

	const userData = getUser(username);
	const socialsData = getSocialAccounts(username);
	const [user, githubSocials] = await Promise.all([userData, socialsData]);

	const email = user.email || primaryUser?.email;

	// Build contact cards (existing logic)
	const contacts = [];
	if (email) {
		contacts.push({
			icon: <GoMail size={20} />,
			href: `mailto:${email}`,
			label: "Email",
			handle: email,
		});
	}
	contacts.push({
		icon: <FaGithub size={20} />,
		href: `https://github.com/${username}`,
		label: "Github",
		handle: username,
	});

	githubSocials.forEach((s) => {
		switch (s.provider) {
			case "linkedin":
				contacts.push({
					icon: <FaLinkedin size={20} />,
					href: s.url,
					label: s.provider,
					handle: s.url.split("/").pop(),
				});
				break;
			case "twitter":
				contacts.push({
					icon: <FaXTwitter size={20} />,
					href: s.url,
					label: s.provider,
					handle: s.url.split("/").pop(),
				});
				break;
			default:
				contacts.push({
					icon: <GoPerson size={20} />,
					href: s.url,
					label: s.url.split("/")[2],
				});
				break;
		}
	});

	return (
		<div className="bg-linear-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />

			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="w-full max-w-2xl mx-auto mt-32 sm:mt-0">
					{/* Header */}
					<div className="mb-12 text-center">
						<h1 className="text-4xl font-medium tracking-tight text-white font-display">
							Get in Touch
						</h1>
						<p className="mt-3 text-zinc-400">
							Send me a message and I'll get back to you soon.
						</p>
					</div>

					{/* Contact Form */}
					<Card>
						<div className="p-8 md:p-12">
							<ContactForm />
						</div>
					</Card>

					{/* Existing Contact Cards */}
					<div className="grid grid-cols-1 gap-8 mx-auto mt-16 sm:grid-cols-3 lg:gap-16">
						{contacts.map((s) => {
							const emailTransform =
								s.label === "Email"
									? "sm:rotate-45 md:rotate-0 lg:rotate-45 xl:rotate-0"
									: "";

							return (
								<Card key={s.label}>
									<Link
										href={s.href}
										target="_blank"
										className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16 sm:p-8"
									>
										<span
											className="absolute w-px h-2/3 bg-linear-to-b from-zinc-500 via-zinc-500/50 to-transparent"
											aria-hidden="true"
										/>
										<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
											{s.icon}
										</span>
										<div className="z-10 flex flex-col items-center">
											<span
												className={`whitespace-nowrap text-xl font-medium duration-150 lg:text-3xl text-zinc-200 group-hover:text-white font-display ${emailTransform}`}
											>
												{s.handle}
											</span>
											<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
												{s.label}
											</span>
										</div>
									</Link>
								</Card>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
