import { useState, useEffect } from "react";
import {
	User2Icon,
	ShuffleIcon,
	CameraIcon,
	UserRoundPenIcon,
} from "lucide-react";
import { toast } from "react-hot-toast";
import AnimatedDiv from "../components/AnimatedDiv";
import useUpdateProfile from "../hooks/useUpdateProfile";
import useAuthUser from "../hooks/useAuthUser";
import { LANGUAGES } from "../constants";
import HoverButton from "../components/HoverButton";
import ProfileCard from "../components/ProfileCard";

const ProfilePage = () => {
	const { authUser } = useAuthUser();
	const [pageLoading, setPageLoading] = useState(true);
	const { updateProfileMutation, isPending } = useUpdateProfile();

	const [formState, setFormState] = useState({
		fullName: authUser?.fullName || "",
		bio: authUser?.bio || "",
		nativeLanguage: authUser?.nativeLanguage || "",
		learningLanguage: authUser?.learningLanguage || "",
		location: authUser?.location || "",
		profilePic: authUser?.profilePic || "",
	});

	useEffect(() => {
		const timer = setTimeout(() => setPageLoading(false), 100);
		return () => clearTimeout(timer);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		updateProfileMutation(formState);
	};

	const handleRandomAvatar = () => {
		const idx = Math.floor(Math.random() * 100) + 1;
		const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
		setFormState((prev) => ({ ...prev, profilePic: randomAvatar }));
		toast.success("New avatar generated!");
	};

	return (
		<div className="min-h-screen pt-24 pb-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-base-100 via-base-200/30 to-base-100">
			<div className="container mx-auto space-y-12 max-w-7xl">
				{/* Header */}
				<AnimatedDiv
					delay={300}
					direction="top"
					isLoading={pageLoading}
					className="text-center space-y-6 pt-8"
				>
					<div className="flex items-center justify-center gap-4">
						<div className="p-3 mt-2 rounded-2xl bg-primary/10 border border-primary/20">
							<User2Icon className="size-8 text-primary" />
						</div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
							My Profile
						</h1>
					</div>
					<p className="text-xl text-base-content/70 max-w-3xl mx-auto">
						Share your story, language goals, and help others connect with you
					</p>
				</AnimatedDiv>

				<form onSubmit={handleSubmit} className="w-full">
					<div className="grid grid-cols-1 md:grid-cols-14 md:grid-rows-7 gap-4">
						{/* Avatar */}
						<AnimatedDiv
							delay={600}
							direction="left"
							isLoading={pageLoading}
							className="md:col-span-4 md:row-span-5"
						>
							<ProfileCard>
								<div className="flex flex-col items-center justify-center space-y-6 w-full md:pt-6 lg:pt-3">
									<div className="relative">
										<div className="size-48 lg:size-56 rounded-full overflow-hidden shadow-2xl ring-4 ring-primary/30 transition-all duration-300 group-hover:ring-primary group-hover:shadow-3xl">
											{formState.profilePic ? (
												<img
													src={formState.profilePic}
													alt="Profile"
													className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
												/>
											) : (
												<div className="flex items-center justify-center h-full bg-primary/10">
													<CameraIcon className="size-20 text-primary transition-all duration-300 group-hover:scale-110" />
												</div>
											)}
										</div>
									</div>
									<button
										type="button"
										onClick={handleRandomAvatar}
										className="btn btn-primary btn-outline border-2 border-primary font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 active:scale-95"
										disabled={isPending}
									>
										<ShuffleIcon className="size-4 mr-2 inline" />
										New Avatar
									</button>
								</div>
							</ProfileCard>
						</AnimatedDiv>

						{/* Name */}
						<AnimatedDiv
							delay={700}
							direction="top"
							isLoading={pageLoading}
							className="md:col-span-5 md:row-span-2"
						>
							<ProfileCard>
								<div className="flex flex-col h-full space-y-2">
									<label
										htmlFor="fullName"
										className="text-base-content text-lg font-bold block duration-300 group-hover:text-primary"
									>
										Full Name
									</label>
									<input
										type="text"
										value={formState.fullName}
										onChange={(e) =>
											setFormState((prev) => ({
												...prev,
												fullName: e.target.value,
											}))
										}
										className="input input-lg w-full rounded-lg border-2 border-primary/30 focus:border-primary focus:outline-none backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 hover:border-primary/50"
										placeholder="Your full name"
									/>
								</div>
							</ProfileCard>
						</AnimatedDiv>

						{/* Location */}
						<AnimatedDiv
							delay={750}
							direction="right"
							isLoading={pageLoading}
							className="md:col-span-5 md:row-span-2"
						>
							<ProfileCard>
								<div className="flex flex-col h-full space-y-2">
									<label
										htmlFor="location"
										className="text-base-content text-lg font-bold block duration-300 group-hover:text-primary"
									>
										Location
									</label>
									<input
										id="location"
										type="text"
										value={formState.location}
										onChange={(e) =>
											setFormState((prev) => ({
												...prev,
												location: e.target.value,
											}))
										}
										className="input input-lg w-full rounded-lg border-2 border-primary/30 focus:border-primary focus:outline-none backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 hover:border-primary/50"
										placeholder="City, Country"
									/>
								</div>
							</ProfileCard>
						</AnimatedDiv>

						{/* Bio */}
						<AnimatedDiv
							delay={800}
							direction="right"
							isLoading={pageLoading}
							className="md:col-span-10 md:row-span-3"
						>
							<ProfileCard>
								<div className="flex flex-col h-full space-y-2">
									<label
										htmlFor="bio"
										className="text-base-content text-lg font-bold block duration-300 group-hover:text-primary"
									>
										About Me
									</label>
									<div className="flex-1 relative">
										<textarea
											id="bio"
											value={formState.bio}
											onChange={(e) =>
												setFormState((prev) => ({
													...prev,
													bio: e.target.value,
												}))
											}
											className="textarea textarea-lg w-full h-full min-h-[120px] rounded-lg border-2 focus:outline-none backdrop-blur-sm resize-none border-primary/30 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 hover:border-primary/50"
											placeholder="Tell others about yourself..."
											maxLength={300}
										/>
										<div className="absolute bottom-2 right-2 text-xs text-base-content/50">
											{formState.bio?.length || 0}/300
										</div>
									</div>
								</div>
							</ProfileCard>
						</AnimatedDiv>

						{/* Native Language */}
						<AnimatedDiv
							delay={900}
							direction="left"
							isLoading={pageLoading}
							className="md:col-span-7 md:row-span-2"
						>
							<ProfileCard>
								<div className="flex flex-col h-full space-y-2">
									<label
										htmlFor="nativeLanguage"
										className="text-base-content text-lg font-bold block duration-300 group-hover:text-primary"
									>
										I Speak
									</label>
									<select
										id="nativeLanguage"
										value={formState.nativeLanguage}
										onChange={(e) =>
											setFormState((prev) => ({
												...prev,
												nativeLanguage: e.target.value,
											}))
										}
										className="select select-lg cursor-pointer w-full rounded-lg border-2 focus:outline-none backdrop-blur-sm border-primary/30 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 hover:border-primary/50"
									>
										<option disabled value="">
											Select native language
										</option>
										{LANGUAGES.map((lang) => (
											<option
												key={`native-${lang}`}
												value={lang.toLowerCase()}
											>
												{lang}
											</option>
										))}
									</select>
								</div>
							</ProfileCard>
						</AnimatedDiv>

						{/* Learning Language */}
						<AnimatedDiv
							delay={1000}
							direction="right"
							isLoading={pageLoading}
							className="md:col-span-7 md:row-span-2"
						>
							<ProfileCard>
								<div className="flex flex-col h-full space-y-2">
									<label
										htmlFor="learningLanguage"
										className="text-base-content text-lg font-bold block duration-300 group-hover:text-primary"
									>
										I Want To Learn
									</label>
									<select
										id="learningLanguage"
										value={formState.learningLanguage}
										onChange={(e) =>
											setFormState((prev) => ({
												...prev,
												learningLanguage:
													e.target.value,
											}))
										}
										className="select select-lg cursor-pointer w-full rounded-lg border-2 focus:outline-none backdrop-blur-sm border-primary/30 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 hover:border-primary/50"
									>
										<option disabled value="">
											Select learning language
										</option>
										{LANGUAGES.map((lang) => (
											<option
												key={`learning-${lang}`}
												value={lang.toLowerCase()}
											>
												{lang}
											</option>
										))}
									</select>
								</div>
							</ProfileCard>
						</AnimatedDiv>

						{/* Submit Button */}
						<AnimatedDiv
							delay={1100}
							direction="bottom"
							isLoading={pageLoading}
							className="md:col-span-14 md:row-span-2 pt-2"
						>
							<HoverButton
								className="btn btn-primary btn-lg w-full rounded-2xl h-16 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
								type="submit"
								disabled={isPending}
							>
								{!isPending ? (
									<>
										<UserRoundPenIcon className="size-6 mr-3" />
										Update my profile
									</>
								) : (
									<>
										<span className="loading loading-dots size-6 mr-3" />
										Updating your profile...
									</>
								)}
							</HoverButton>
						</AnimatedDiv>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
