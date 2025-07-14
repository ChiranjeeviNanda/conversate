import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { HomeIcon, Users2Icon, BellRingIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";

// Dock item component
const DockItem = ({
    children,
    to,
    mouseX,
    spring,
    distance,
    magnification,
    baseItemSize,
}) => {
    const ref = useRef(null);
    const isHovered = useMotionValue(0);
    const location = useLocation();
    const isActive = location.pathname === to;

    const mouseDistance = useTransform(mouseX, (val) => {
        const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - rect.x - rect.width / 2;
    });

    const targetSize = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [baseItemSize, magnification, baseItemSize]
    );

    const size = useSpring(targetSize, spring);

    const activeClasses = getActiveClasses(isActive);

    return (
        <Link to={to} className="outline-none" tabIndex={-1}>
            <motion.div
                ref={ref}
                style={{ width: size, height: size }}
                onHoverStart={() => isHovered.set(1)}
                onHoverEnd={() => isHovered.set(0)}
                className={`group relative flex items-center justify-center cursor-pointer rounded-2xl border transition-colors duration-200 ${activeClasses.container}`}
                role="button"
                aria-haspopup="true"
                tabIndex={0}
            >
                {Children.map(children, (child) =>
                    cloneElement(child, { isHovered, isActive })
                )}
            </motion.div>
        </Link>
    );
};

// Tooltip for dock item
const DockLabel = ({ children, isHovered }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on("change", (latest) =>
            setIsVisible(latest === 1)
        );
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-pre rounded-md bg-neutral px-3 py-1.5 text-sm font-semibold text-neutral-content shadow-lg min-h-[32px] flex items-center"
                    role="tooltip"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Icon wrapper
const DockIcon = ({ children, isActive }) => {
    const activeClasses = getActiveClasses(isActive);

    return (
        <div
            className={`flex items-center justify-center transition-all duration-300 ${activeClasses.text} ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
        >
            {children}
        </div>
    );
};

// Reusable active state classes
const getActiveClasses = (isActive) => ({
    container: isActive
        ? "bg-primary/70 border-primary shadow-lg"
        : "bg-base-300/70 border-base-content/20 hover:bg-base-300/90 hover:border-base-content/40",
    text: isActive
        ? "text-primary-content"
        : "text-base-content/70 group-hover:text-base-content",
    subText: isActive
        ? "text-primary-content/80"
        : "text-base-content/60"
});

// Profile avatar section - now using DockItem for consistency
const ProfileSection = ({ mouseX, spring, distance, magnification, baseItemSize }) => {
    const { authUser } = useAuthUser();
    const ref = useRef(null);
    const isHovered = useMotionValue(0);
    const location = useLocation();
    const isActive = location.pathname === "/profile";

    const mouseDistance = useTransform(mouseX, (val) => {
        const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - rect.x - rect.width / 2;
    });

    // Use responsive sizing based on screen size
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const targetWidth = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        isMobile ? [baseItemSize, magnification, baseItemSize] : [140, 150, 140]
    );

    const width = useSpring(targetWidth, spring);
    const height = useSpring(isMobile ? targetWidth : baseItemSize, spring);

    const activeClasses = getActiveClasses(isActive);

    return (
        <Link to="/profile" className="outline-none" tabIndex={-1}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onHoverStart={() => isHovered.set(1)}
                onHoverEnd={() => isHovered.set(0)}
                className={`group relative flex items-center justify-center cursor-pointer rounded-2xl border transition-colors duration-200 ${activeClasses.container} ${isMobile ? '' : 'px-3'}`}
                role="button"
                tabIndex={0}
            >
                <div className="avatar flex-shrink-0">
                    <div className="w-8 sm:w-10 rounded-full ring-2 ring-offset-2 ring-offset-base-100 ring-transparent">
                        <img src={authUser?.profilePic} alt="User Avatar" />
                    </div>
                </div>

                {!isMobile && (
                    <div className="flex flex-col justify-center ml-3 min-w-0 flex-1">
                        <p className={`text-sm font-bold truncate leading-tight transition-colors duration-200 ${activeClasses.text}`}>
                            {authUser?.fullName}
                        </p>
                        <p className={`text-xs font-medium whitespace-nowrap leading-tight transition-colors duration-200 ${activeClasses.subText}`}>
                            My Profile
                        </p>
                    </div>
                )}
                
                <DockLabel isHovered={isHovered}>Profile</DockLabel>
            </motion.div>
        </Link>
    );
};

// Main Dock
const Dock = ({
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 72,
    distance = 150,
    baseItemSize = 56,
}) => {
    const mouseX = useMotionValue(Infinity);

    const items = [
        { path: "/home", icon: <HomeIcon size={22} />, label: "Home" },
        { path: "/friends", icon: <Users2Icon size={22} />, label: "Friends" },
        { path: "/notifications", icon: <BellRingIcon size={22} />, label: "Notifications" },
    ];

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-2xl">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-center justify-center w-[95vw] max-w-fit h-24 gap-3 p-3 rounded-2xl border border-base-content/30 shadow-2xl"
                style={{
                    backdropFilter: "blur(12px) saturate(180%)",
                    WebkitBackdropFilter: "blur(12px) saturate(180%)",
                    backgroundColor: "hsla(var(--b3) / 0.2)",
                }}
                role="toolbar"
                aria-label="Application Dock"
            >
                <div className="flex items-center gap-3">
                    {items.map((item) => (
                        <DockItem
                            key={item.path}
                            to={item.path}
                            mouseX={mouseX}
                            spring={spring}
                            distance={distance}
                            magnification={magnification}
                            baseItemSize={baseItemSize}
                        >
                            <DockIcon>{item.icon}</DockIcon>
                            <DockLabel>{item.label}</DockLabel>
                        </DockItem>
                    ))}
                </div>

                <div className="h-12 w-px bg-base-content/20" />

                <ProfileSection
                    mouseX={mouseX}
                    spring={spring}
                    distance={distance}
                    magnification={magnification}
                    baseItemSize={baseItemSize}
                />
            </motion.div>
        </div>
    );
};

export default Dock;