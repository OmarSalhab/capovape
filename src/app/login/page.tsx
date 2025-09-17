"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

		const router = useRouter();

		async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		setLoading(true);
		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data?.error || "Login failed");
			} else {
					setSuccess("Login successful");
					// Redirect to admin panel after small delay to show success message
					setTimeout(() => {
						router.push('/admin');
					}, 600);
			}
			} catch (err: unknown) {
				const message = err instanceof Error ? err.message : String(err);
				setError(message || "Network error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050505] to-[#0a0a0a] p-6">
			<div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
				{/* Image placeholder */}
				<div className="hidden md:flex items-center justify-center bg-[url('/capovape-logo.jpg')] bg-center bg-cover rounded-lg shadow-xl h-96">
					<div className="bg-black/40 p-6 rounded">
						<h2 className="text-2xl font-serif text-[var(--color-mafia)]">Welcome Back</h2>
						<p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access the admin area.</p>
					</div>
				</div>

				{/* Login card */}
				<div className="bg-[#0b0b0b] rounded-lg shadow-xl p-8 h-96 flex flex-col justify-center">
					<form onSubmit={handleSubmit} className="max-w-sm mx-auto w-full">
						<h1 className="text-2xl font-serif text-[var(--color-mafia)] mb-2">Sign In</h1>
						<p className="text-sm text-muted-foreground mb-6">Please enter your username and password.</p>

						<label className="block mb-3">
							<span className="text-xs text-muted-foreground">Username</span>
							<input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								name="username"
								className="mt-1 block w-full rounded-md bg-[#111] border border-[#222] px-3 py-2 text-white focus:ring-2 focus:ring-[var(--color-mafia)]"
								placeholder="admin"
								required
							/>
						</label>

						<label className="block mb-4">
							<span className="text-xs text-muted-foreground">Password</span>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								name="password"
								className="mt-1 block w-full rounded-md bg-[#111] border border-[#222] px-3 py-2 text-white focus:ring-2 focus:ring-[var(--color-mafia)]"
								placeholder="••••••••"
								required
							/>
						</label>

						<button disabled={loading} type="submit" className="w-full mt-2 bg-[var(--color-mafia)] text-black py-2 rounded-md font-semibold">
							{loading ? "Signing in..." : "Sign in"}
						</button>

						{error && <div className="mt-3 text-sm text-red-400">{error}</div>}
						{success && <div className="mt-3 text-sm text-green-400">{success}</div>}
					</form>
				</div>
			</div>
		</div>
	);
}

