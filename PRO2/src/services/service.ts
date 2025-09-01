import type { User } from "../types/User";

export const fetchUser = async (searchTerm: string, limit: number, skip: number): Promise<User[]> => {
    const BASE_URL = "https://dummyjson.com/users";
    try {
        const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}&skip=${skip}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.users || [];
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}