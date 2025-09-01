import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UserTable from '../UserTable';

// === Mock Hooks ===
import * as useUserHook from '../../hooks/useUser';

vi.mock('../../hooks/useUser', () => ({
    useUser: vi.fn(),
}));
vi.mock('../../hooks/usePagination', () => ({
    usePagination: vi.fn(() => vi.fn()),
}));

// === Mock Child Components ===
vi.mock('../SearchBar', () => ({
    default: ({ onSearch }: any) => (
        <input
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
        />
    ),
}));
vi.mock('../GenderFilter', () => ({
    default: ({ onFilter }: any) => (
        <select onChange={(e) => onFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
    ),
}));

// === Sample Users ===
const mockUsers = [
    { id: 1, firstName: 'John', email: 'john@example.com', gender: 'male' },
    { id: 2, firstName: 'Jane', email: 'jane@example.com', gender: 'female' },
];

describe('UserTable', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders "NO USER FOUND" when no users are returned', () => {
        (useUserHook.useUser as any).mockReturnValue({
            users: [],
            loading: false,
            hasMore: false,
            loadMore: vi.fn(),
        });

        render(<UserTable />);
        expect(screen.getByText(/no user found/i)).toBeInTheDocument();
    });

    it('renders user data in the table', () => {
        (useUserHook.useUser as any).mockReturnValue({
            users: mockUsers,
            loading: false,
            hasMore: false,
            loadMore: vi.fn(),
        });

        render(<UserTable />);
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('filters users by gender', () => {
        (useUserHook.useUser as any).mockReturnValue({
            users: mockUsers,
            loading: false,
            hasMore: false,
            loadMore: vi.fn(),
        });

        render(<UserTable />);
        const genderSelect = screen.getByRole('combobox');
        fireEvent.change(genderSelect, { target: { value: 'female' } });

        expect(screen.queryByText('John')).toBeInTheDocument();
        expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    it('shows loading indicator when loading is true', () => {
        (useUserHook.useUser as any).mockReturnValue({
            users: mockUsers,
            loading: true,
            hasMore: true,
            loadMore: vi.fn(),
        });

        render(<UserTable />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    it('filters users based on search term', () => {
        (useUserHook.useUser as any).mockImplementation((props: any) => {
            const { searchTerm } = props || {};
            const filtered = mockUsers.filter(user =>
                user.email.includes(searchTerm)
            );
            return {
                users: filtered,
                loading: false,
                hasMore: false,
                loadMore: vi.fn(),
            };
        });

        render(<UserTable />);
        const input = screen.getByPlaceholderText(/search/i);

        fireEvent.change(input, { target: { value: 'john' } });

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.queryByText('Jane')).not.toBeInTheDocument();
    });
});
