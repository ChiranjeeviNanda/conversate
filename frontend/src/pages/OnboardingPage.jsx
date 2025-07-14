import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
	ShuffleIcon,
	UserRoundPenIcon,
	CameraIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";
import HoverButton from "../components/HoverButton";
import Logo from "../components/Logo";
import useOnboarding from "../hooks/useOnboarding";
import useAuthUser from "../hooks/useAuthUser";
import AnimatedDiv from "../components/AnimatedDiv";
import ProfileCard from "../components/ProfileCard";

const OnboardingPage = () => {
	 const [pageLoading, setpageLoading] = useState(true);
    const { authUser } = useAuthUser();
    const fullNameRef = useRef(null);

    const [formState, setFormState] = useState({
        fullName: authUser?.fullName || "",
        bio: authUser?.bio || "",
        nativeLanguage: authUser?.nativeLanguage || "",
        learningLanguage: authUser?.learningLanguage || "",
        location: authUser?.location || "",
        profilePic: authUser?.profilePic || "",
    });

    const { onboardingMutation, isPending } = useOnboarding();

    useEffect(() => {
        const timer = setTimeout(() => {
            setpageLoading(false);
            setTimeout(() => fullNameRef.current?.focus(), 100);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onboardingMutation(formState);
    };

    const handleRandomAvatar = () => {
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
        setFormState((prev) => ({ ...prev, profilePic: randomAvatar }));
        toast.success("New avatar generated!");
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/30 to-base-100 flex items-center justify-center p-4 font-inter"
            data-theme="forest"
        >
            <div className="card w-full max-w-7xl bg-base-100 backdrop-blur-sm shadow-2xl border border-primary/25 p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12">
                        {/* Left Column */}
                        <div className="space-y-6 flex flex-col items-start">
                            {/* Logo */}
                            <AnimatedDiv
                                delay={200}
                                direction="top"
                                duration={700}
                                isLoading={pageLoading}
                            >
                                <Logo
                                    size="size-10"
                                    bgColor="bg-primary"
                                    iconColor="text-primary-content"
                                />
                            </AnimatedDiv>

                            {/* Header */}
                            <AnimatedDiv
                                delay={400}
                                direction="left"
                                duration={700}
                                isLoading={pageLoading}
                                className="w-full text-center lg:text-left"
                            >
                                <h1 className="text-4xl font-bold text-primary pb-3">
                                    Personalize Your Profile
                                </h1>
                                <p className="text-base-content/70 text-lg">
                                    Complete your profile to get started!
                                </p>
                            </AnimatedDiv>

                            {/* Avatar Card */}
                            <AnimatedDiv
                                delay={600}
                                direction="left"
                                isLoading={pageLoading}
                                className="w-full"
                            >
                                <ProfileCard>
                                    <div className="flex flex-col items-center justify-center space-y-6">
                                        <div className="relative">
                                            <div className="size-44 lg:size-52 rounded-full overflow-hidden shadow-2xl ring-4 ring-primary/30 transition-all duration-300 group-hover:ring-primary group-hover:shadow-3xl">
                                                {formState.profilePic ? (
                                                    <img
                                                        src={formState.profilePic}
                                                        alt="Profile"
                                                        className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                        onError={(e) => {
                                                            e.target.onerror = null; // Prevent infinite loop
                                                            e.target.src = "https://placehold.co/200x200/cccccc/000000?text=Avatar"; // Fallback image
                                                        }}
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
                                            className="btn btn-primary btn-outline font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 active:scale-95"
                                            disabled={isPending}
                                        >
                                            <ShuffleIcon className="size-4 mr-2 inline" />
                                            New Avatar
                                        </button>
                                    </div>
                                </ProfileCard>
                            </AnimatedDiv>
                        </div>

                        {/* Right Column: Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <AnimatedDiv
                                delay={700}
                                direction="top"
                                isLoading={pageLoading}
                                duration={700}
                                className="md:col-span-1"
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
                                            ref={fullNameRef} // Attach ref here
                                            type="text"
                                            id="fullName"
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
                                duration={700}
                                className="md:col-span-1"
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
                                duration={700}
                                className="md:col-span-2"
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
                                                className="textarea textarea-lg w-full h-full min-h-[120px] rounded-lg border-2 focus:outline-none resize-none border-primary/30 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 hover:border-primary/50"
                                                placeholder="Tell others about yourself..."
                                                maxLength={300}
                                            />
                                            <div className="absolute bottom-2 right-2 text-xs text-base-content/50">
                                                {formState.bio?.length || 0}
                                                /300
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
                                duration={700}
                                className="md:col-span-1"
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
                                            className="select select-lg cursor-pointer w-full rounded-lg border-2 focus:outline-none border-primary/30 focus:border-primary transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 hover:border-primary/50"
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
                                duration={700}
                                className="md:col-span-1"
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
                                                    learningLanguage: e.target.value,
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
                        </div>
                    </div>

                    {/* Submit Button */}
                    <AnimatedDiv
                        delay={1000}
                        direction="bottom"
                        isLoading={pageLoading}
                        duration={700}
                    >
                        <HoverButton
                            className="btn btn-primary btn-lg w-full rounded-2xl h-16 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
                            type="submit"
                            disabled={isPending}
                        >
                            {!isPending ? (
                                <>
                                    <UserRoundPenIcon className="size-6 mr-3" />
                                    Complete Onboarding
                                </>
                            ) : (
                                <>
                                    <span className="loading loading-dots size-6 mr-3" />
                                    Setting up your profile...
                                </>
                            )}
                        </HoverButton>
                    </AnimatedDiv>
                </form>
            </div>
        </div>
    );
};

export default OnboardingPage;
