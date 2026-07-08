"use client";

import { useState } from "react";
import Turnstile from "react-turnstile";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		firstName: "",
		email: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("");
	const [turnstileToken, setTurnstileToken] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!turnstileToken) {
			setStatus("Please complete the security check");
			return;
		}

		setLoading(true);
		setStatus("");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...formData, turnstileToken }),
			});

			const result = await res.json();

			if (res.ok) {
				setStatus("Message sent successfully! ✅");
				setFormData({ firstName: "", email: "", message: "" });
				setTurnstileToken(null); // Reset Turnstile
			} else {
				setStatus(result.error || "Failed to send message");
			}
		} catch (_err) {
			setStatus("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-8">
			<div>
				<label className="block mb-2 text-sm text-zinc-400" htmlFor="firstName">
					Name
				</label>
				<input
					type="text"
					id="firstName"
					required
					value={formData.firstName}
					onChange={(e) =>
						setFormData({ ...formData, firstName: e.target.value })
					}
					className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:border-zinc-500 text-white placeholder-zinc-500"
					placeholder="Your name"
				/>
			</div>

			<div>
				<label className="block mb-2 text-sm text-zinc-400" htmlFor="email">
					Email
				</label>
				<input
					type="email"
					id="email"
					required
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:border-zinc-500 text-white placeholder-zinc-500"
					placeholder="you@example.com"
				/>
			</div>

			<div>
				<label className="block mb-2 text-sm text-zinc-400" htmlFor="message">
					Message
				</label>
				<textarea
					required
					id="message"
					rows={6}
					value={formData.message}
					onChange={(e) =>
						setFormData({ ...formData, message: e.target.value })
					}
					className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:border-zinc-500 text-white placeholder-zinc-500 resize-y"
					placeholder="Your message..."
				/>
			</div>

			{/* Turnstile */}
			<div className="flex justify-center">
				<Turnstile
					sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
					onVerify={(token) => setTurnstileToken(token)}
					onError={() => setTurnstileToken(null)}
					onExpire={() => setTurnstileToken(null)}
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="w-full py-4 text-lg font-medium transition-all duration-200 bg-white text-zinc-900 rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{loading ? "Sending..." : "Send Message"}
			</button>

			{status && (
				<p
					className={`text-center text-sm ${status.includes("✅") ? "text-emerald-400" : "text-red-400"}`}
				>
					{status}
				</p>
			)}
		</form>
	);
}
