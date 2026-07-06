import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
	const { username } = params;

	const token =
		username === process.env.GITHUB_USERNAME
			? process.env.GH_TOKEN
			: process.env.SECONDARY_GH_TOKEN;

	const response = await fetch(`https://api.github.com/users/${username}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	const data = await response.json();

	return NextResponse.json(data);
}
