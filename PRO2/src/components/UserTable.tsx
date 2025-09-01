import React, { useState } from 'react';
import { useUser } from "../hooks/useUser";
import type { User } from '../types/User';
import SearchBar from './SearchBar';
import GenderFilter from './GenderFilter';
import { usePagination } from '../hooks/usePagination';

const UserTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGender, setGender] = useState('all');

    // Pass both filters to the hook
    const { users, loading, hasMore, loadMore } = useUser({ searchTerm, selectedGender });
    const lastUserRef = usePagination({ hasMore, loading, onLoadMore: loadMore });

    if (!users.length && !loading) {
        return <div>NO USER FOUND</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <SearchBar onSearch={setSearchTerm} />
                <GenderFilter onFilter={setGender} />
            </div>

            <table border={1} width="100%" style={{ marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User, index) => {
                        const isLast = index === users.length - 1;
                        return (
                            <tr key={user.id} ref={isLast ? lastUserRef : null}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default UserTable;
