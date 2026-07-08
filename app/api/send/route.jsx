import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
	try {
		const { firstName, email, message, turnstileToken } = await request.json();

		// === Turnstile Verification ===
		const turnstileResponse = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					secret: process.env.TURNSTILE_SECRET_KEY,
					response: turnstileToken,
					remoteip: request.headers.get("x-forwarded-for") || "",
				}),
			},
		);

		const turnstileData = await turnstileResponse.json();

		if (!turnstileData.success) {
			return Response.json(
				{ error: "CAPTCHA verification failed" },
				{ status: 400 },
			);
		}

		// === Send Email ===
		const { data, error } = await resend.emails.send({
			from: "Contact Form <onboarding@resend.dev>", // Use your verified domain
			to: ["you@yourdomain.com"], // Change to your email
			subject: `New Contact Form Message from ${firstName}`,
			react: EmailTemplate({
				firstName,
				email,
				message,
			}),
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json({ success: true, data });
	} catch (_error) {
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}
