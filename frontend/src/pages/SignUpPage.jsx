import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import {
	KeyRoundIcon,
	MailIcon,
	User2Icon,
	XCircleIcon,
	CircleAlertIcon,
	UserRoundPlusIcon,
} from "lucide-react";
import useSignUp from "../hooks/useSignUp";
import Logo from "../components/Logo";
import HoverButton from "../components/HoverButton";
import AnimatedDiv from "../components/AnimatedDiv";

const SignUpPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [signUpData, setSignUpData] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const fullNameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const termsRef = useRef(null);
	const submitRef = useRef(null);

	const { signUpMutation, isPending, error } = useSignUp();

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
			// Focus full name field after animations complete
			setTimeout(() => fullNameRef.current?.focus(), 100);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		signUpMutation(signUpData);
	};

	const handleInputChange = (field) => (e) => {
		setSignUpData((prev) => ({ ...prev, [field]: e.target.value }));
	};

	const handleKeyDown = (e, nextRef) => {
		if (e.key === "Enter" && nextRef?.current) {
			e.preventDefault();
			nextRef.current.focus();
		}
	};

	const handleCheckboxKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitRef.current?.focus();
		}
	};

	return (
		<div
			className="min-h-screen bg-gradient-to-br from-base-100 to-base-300 flex items-center justify-center p-4"
			data-theme="forest"
		>
			<div className="card bg-base-100 backdrop-blur-sm shadow-2xl border border-primary/25 w-full max-w-5xl">
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
									Create an Account
								</h1>
								<p className="text-base text-base-content/70 leading-relaxed">
									Practice conversations, make friends, and
									improve your language skills together!
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

							<form onSubmit={handleSubmit}>
								<AnimatedDiv
									delay={600}
									direction="right"
									isLoading={isLoading}
									className="space-y-3"
								>
									{/* Full Name */}
									<div className="form-control group">
										<label
											className="label pb-1"
											htmlFor="fullName"
										>
											<span className="label-text text-base font-semibold text-base-content/90">
												Full Name
											</span>
										</label>
										<div className="relative">
											<User2Icon
												className="absolute top-1/2 transform -translate-y-1/2 left-4 size-5 text-primary/70 z-10 transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110"
												aria-hidden="true"
											/>
											<input
												ref={fullNameRef}
												id="fullName"
												type="text"
												value={signUpData.fullName}
												onChange={handleInputChange(
													"fullName"
												)}
												onKeyDown={(e) =>
													handleKeyDown(e, emailRef)
												}
												className="input input-bordered input-lg w-full pl-12 rounded-2xl transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 hover:border-primary/50 focus:border-primary"
												placeholder="John Doe"
												required
												tabIndex={0}
											/>
										</div>
									</div>

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
												value={signUpData.email}
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
												value={signUpData.password}
												onChange={handleInputChange(
													"password"
												)}
												onKeyDown={(e) =>
													handleKeyDown(e, termsRef)
												}
												className="input input-bordered input-lg w-full pl-12 rounded-2xl transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 hover:border-primary/50 focus:border-primary"
												placeholder="••••••••"
												required
												minLength={8}
												tabIndex={0}
											/>
										</div>
										<div className="flex items-center gap-2 pt-2 opacity-70">
											<CircleAlertIcon
												className="size-5"
												aria-hidden="true"
											/>
											<p className="text-sm opacity-70">
												Password must be at least 8
												characters long
											</p>
										</div>
									</div>

									{/* Terms */}
									<div className="form-control">
										<label className="w-full flex gap-3 items-center py-3 hover:bg-base-200/50 rounded-xl transition-all duration-300">
											<input
												ref={termsRef}
												type="checkbox"
												className="checkbox checkbox-primary mt-1 md:mt-0 shrink-0 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1"
												required
												onKeyDown={
													handleCheckboxKeyDown
												}
												tabIndex={0}
												aria-describedby="terms-description"
											/>
											<span
												id="terms-description"
												className="text-sm text-base-content/80 leading-snug break-words cursor-pointer"
											>
												I agree to the{" "}
												<Link
													to="/terms"
													className="text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded"
													tabIndex={0}
												>
													Terms of Service
												</Link>{" "}
												and{" "}
												<Link
													to="/privacy"
													className="text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded"
													tabIndex={0}
												>
													Privacy Policy
												</Link>
											</span>
										</label>
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
										className="btn-primary w-full rounded-2xl h-16 text-lg font-semibold focus:ring-2 focus:ring-primary focus:ring-offset-2"
										type="submit"
										disabled={isPending}
										tabIndex={0}
									>
										{!isPending ? (
											<>
												<UserRoundPlusIcon
													className="size-6 mr-3"
													aria-hidden="true"
												/>
												Create Account
											</>
										) : (
											<>
												<span
													className="loading loading-dots size-6 mr-3"
													aria-hidden="true"
												/>
												Creating your account...
											</>
										)}
									</HoverButton>

									{/* Login Link */}
									<p className="text-sm text-center text-base-content/70">
										Already have an account?{" "}
										<Link
											to="/login"
											className="text-primary hover:underline font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
											tabIndex={0}
										>
											Sign in
										</Link>
									</p>
								</AnimatedDiv>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
