export function EmailTemplate({ firstName, email, message }) {
	return (
		<div style={{ fontFamily: "sans-serif", padding: "20px" }}>
			<h1>New Contact Form Submission</h1>
			<p>
				<strong>Name:</strong> {firstName}
			</p>
			<p>
				<strong>Email:</strong> {email}
			</p>
			<p>
				<strong>Message:</strong>
			</p>
			<p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
		</div>
	);
}

export default EmailTemplate;
