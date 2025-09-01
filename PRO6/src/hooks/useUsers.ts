import { useState, useCallback } from "react";


export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const fetchUsers = useCallback(async () => {
        try {
            const res = await fetch('https://dummyjson.com/users');
            const data = await res.json()
            setUsers(data);
        } catch (err) {
            console.log("err")
        }
    }, [])
};
