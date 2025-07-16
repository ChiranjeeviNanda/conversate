import { useState, useEffect, useCallback } from "react";

const LOCAL_STORAGE_KEY = "recentlyMessagedFriends";

const useFriendsOrder = (friends = []) => {
    const [recentlyMessaged, setRecentlyMessaged] = useState(() => {
        try {
            const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
            return storedValue ? JSON.parse(storedValue) : [];
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentlyMessaged));
        } catch (error) {
            console.error("Error writing to localStorage:", error);
        }
    }, [recentlyMessaged]);

    const handleFriendMessaged = useCallback((friendId) => {
        setRecentlyMessaged((prev) => {
            const filtered = prev.filter((id) => id !== friendId);
            return [friendId, ...filtered];
        });
    }, []);

    const getOrderedFriends = useCallback(() => {
        if (!friends || friends.length === 0) return [];

        // Create a copy and reverse
        const reversedFriends = [...friends].reverse();

        const friendsMap = new Map(
            reversedFriends.map((friend) => [friend._id, friend])
        );

        const recentlyMessagedFriends = [];
        const otherFriends = [];

        // Prioritize friends in recentlyMessaged order
        recentlyMessaged.forEach((friendId) => {
            const friend = friendsMap.get(friendId);
            if (friend) {
                recentlyMessagedFriends.push(friend);
                friendsMap.delete(friendId); // Remove from map to avoid duplicates
            }
        });

        // Add remaining friends
        friendsMap.forEach((friend) => {
            otherFriends.push(friend);
        });

        return [...recentlyMessagedFriends, ...otherFriends];
    }, [friends, recentlyMessaged]);

    useEffect(() => {
        if (friends && friends.length === 0) {
            setRecentlyMessaged([]);
        }
    }, [friends]);

    return {
        orderedFriends: getOrderedFriends(),
        handleFriendMessaged,
        recentlyMessaged,
    };
};

export default useFriendsOrder;