import { useState, useCallback, useEffect } from "react";
import type { User } from "../types/User";
import { fetchUser } from "../services/service";

interface APIRequestProps {
    searchTerm: string;
    selectedGender: string;
}

export const useUser = ({ searchTerm, selectedGender }: APIRequestProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const LIMIT = 10;

    // Filter users by gender locally, since API may not support this
    const filterByGender = (userList: User[]) => {
        if (selectedGender === 'all') return userList;
        return userList.filter(user => user.gender === selectedGender);
    };

    // Load more users (pagination)
    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const newUsers = await fetchUser(searchTerm, LIMIT, skip);
            // Filter newly fetched users by gender before adding
            const filteredNewUsers = filterByGender(newUsers);

            setUsers(prev => [...prev, ...filteredNewUsers]);
            setSkip(prev => prev + LIMIT);

            // If fewer than LIMIT users returned, no more data to load
            setHasMore(newUsers.length === LIMIT);
        } catch (error) {
            console.error("Failed to load more users:", error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, searchTerm, skip, selectedGender]);

    // When searchTerm or selectedGender changes, reset state and fetch initial data
    useEffect(() => {
        const fetchInitialUsers = async () => {
            setLoading(true);
            setUsers([]); // clear previous users
            setSkip(0);
            setHasMore(true);
            try {
                const firstBatch = await fetchUser(searchTerm, LIMIT, 0);
                const filteredBatch = filterByGender(firstBatch);
                setUsers(filteredBatch);
                setSkip(LIMIT);
                setHasMore(firstBatch.length === LIMIT);
            } catch (error) {
                console.error("Initial fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialUsers();
    }, [searchTerm, selectedGender]);

    return {
        users,
        loading,
        hasMore,
        loadMore,
    };
};
