import {
	KeyRoundIcon,
	LaughIcon,
	MailIcon,
	UserRoundCheckIcon,
	XCircleIcon,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import Logo from "../components/Logo";
import HoverButton from "../components/HoverButton";
import useLogIn from "../hooks/useLogIn";
import AnimatedDiv from "../components/AnimatedDiv";

const LogInPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [logInData, setLogInData] = useState({ email: "", password: "" });
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const submitRef = useRef(null);

	const { logInMutation, isPending, error } = useLogIn();

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			// Focus email field after animations complete
			setTimeout(() => emailRef.current?.focus(), 100);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		logInMutation(logInData);
	};

	const handleKeyDown = (e, nextRef) => {
		if (e.key === "Enter" && nextRef?.current) {
			e.preventDefault();
			nextRef.current.focus();
		}
	};

	const handleInputChange = (field) => (e) => {
		setLogInData((prev) => ({ ...prev, [field]: e.target.value }));
	};

	return (
		<div
			className="min-h-screen bg-gradient-to-br from-base-100 to-base-300 flex items-center justify-center p-4"
			data-theme="forest"
		>
			<div className="w-full max-w-5xl animate-in fade-in duration-700 slide-in-from-bottom-4">
				<div className="card bg-base-100 backdrop-blur-sm shadow-2xl border border-primary/25">
					<div className="card-body p-6 sm:p-8 lg:p-10">
						<div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-center">
							{/* Left Column */}
							<div className="space-y-6">
								{/* Logo */}
								<AnimatedDiv
									delay={200}
									direction="top"
									duration={700}
									isLoading={isLoading}
								>
									<Link to="/" tabIndex={0}>
										<Logo
											size="size-10"
											bgColor="bg-primary"
											iconColor="text-primary-content"
										/>
									</Link>
								</AnimatedDiv>

								{/* Header */}
								<AnimatedDiv
									delay={400}
									direction="left"
									duration={700}
									isLoading={isLoading}
								>
									<h1 className="text-3xl lg:text-4xl font-bold text-primary pb-2">
										Welcome Back
									</h1>
									<p className="text-base text-base-content/70 leading-relaxed">
										Practice conversations, make friends,
										and improve your language skills
										together!
									</p>
								</AnimatedDiv>

								{/* Illustration */}
								<AnimatedDiv
									delay={600}
									direction="bottom"
									isLoading={isLoading}
								>
									<img
										src="/login-image.svg"
										alt="Language connection illustration"
										className="size-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
									/>
								</AnimatedDiv>
							</div>

							{/* Right Column - Form */}
							<div className="space-y-6">
								<AnimatedDiv
										delay={600}
										direction="right"
										isLoading={isLoading}
										className="text-center mb-8 py-4 px-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10 backdrop-blur-sm">
									<div className="flex items-center justify-center gap-3 mb-2">
										<LaughIcon
											className="size-6 text-primary animate-pulse"
											aria-hidden="true"
										/>
										<h2 className="text-xl font-bold text-primary">
											Great to see you again!
										</h2>
									</div>
									<p className="text-base text-base-content/70 font-medium">
										Your language learning journey continues
										here
									</p>
								</AnimatedDiv>

								{/* Error Messages */}
								{error && (
									<div
										className="alert alert-error"
										role="alert"
										aria-live="polite"
									>
										<XCircleIcon
											className="size-5"
											aria-hidden="true"
										/>
										<span className="font-semibold">
											{error.response?.data?.message ||
												"Something went wrong"}
										</span>
									</div>
								)}

								<form
									onSubmit={handleSubmit}
									className="space-y-3"
								>
									<AnimatedDiv
										delay={600}
										direction="right"
										isLoading={isLoading}
										className="space-y-3"
									>
										{/* Email */}
										<div className="form-control group">
											<label
												className="label pb-1"
												htmlFor="email"
											>
												<span className="label-text text-base font-semibold text-base-content/90">
													Email
												</span>
											</label>
											<div className="relative">
												<MailIcon
													className="absolute top-1/2 transform -translate-y-1/2 left-4 size-5 text-primary/70 z-10 transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110"
													aria-hidden="true"
												/>
												<input
													ref={emailRef}
													id="email"
													type="email"
													value={logInData.email}
													onChange={handleInputChange(
														"email"
													)}
													onKeyDown={(e) =>
														handleKeyDown(
															e,
															passwordRef
														)
													}
													className="input input-bordered input-lg w-full pl-12 rounded-2xl transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 hover:border-primary/50 focus:border-primary"
													placeholder="john@email.com"
													required
													aria-describedby="email-error"
													tabIndex={0}
												/>
											</div>
										</div>

										{/* Password */}
										<div className="form-control group">
											<label
												className="label pb-1"
												htmlFor="password"
											>
												<span className="label-text text-base font-semibold text-base-content/90">
													Password
												</span>
											</label>
											<div className="relative">
												<KeyRoundIcon
													className="absolute top-1/2 transform -translate-y-1/2 left-4 size-5 text-primary/70 z-10 transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110"
													aria-hidden="true"
												/>
												<input
													ref={passwordRef}
													id="password"
													type="password"
													value={logInData.password}
													onChange={handleInputChange(
														"password"
													)}
													onKeyDown={(e) =>
														handleKeyDown(
															e,
															submitRef
														)
													}
													className="input input-bordered input-lg w-full pl-12 rounded-2xl transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 hover:border-primary/50 focus:border-primary"
													placeholder="••••••••"
													required
													aria-describedby="password-error"
													tabIndex={0}
												/>
											</div>
										</div>
									</AnimatedDiv>

									<AnimatedDiv
										delay={1000}
										direction="bottom"
										isLoading={isLoading}
										className="space-y-3"
									>
										{/* Submit Button */}
										<HoverButton
											ref={submitRef}
											className="btn-primary w-full rounded-2xl h-16 text-lg font-semibold mt-3 focus:ring-2 focus:ring-primary focus:ring-offset-2"
											type="submit"
											disabled={isPending}
											tabIndex={0}
											aria-describedby={
												error ? "form-error" : undefined
											}
										>
											{!isPending ? (
												<>
													<UserRoundCheckIcon
														className="size-6 mr-3"
														aria-hidden="true"
													/>
													Sign In
												</>
											) : (
												<>
													<span
														className="loading loading-dots size-6 mr-3"
														aria-hidden="true"
													/>
													Signing you in...
												</>
											)}
										</HoverButton>

										{/* Signup Link */}
										<p className="text-sm text-center text-base-content/70">
											Don't have an account?{" "}
											<Link
												to="/signup"
												className="text-primary hover:underline font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
												tabIndex={0}
											>
												Sign up
											</Link>
										</p>
									</AnimatedDiv>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LogInPage;
