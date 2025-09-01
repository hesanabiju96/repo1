import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from '../SearchBar';

// Mock the debounce hook to return the input immediately for simpler testing
vi.mock('../../hooks/useDebounce', () => ({
    useDebounce: (value: string) => value,
}));

describe('SearchBar component', () => {
    it('renders the input element', () => {
        const mockSearch = vi.fn();
        render(<SearchBar onSearch={mockSearch} />);

        const inputElement = screen.getByPlaceholderText(/search by email/i);
        expect(inputElement).toBeInTheDocument();
    });

    it('calls onSearch with input value', async () => {
        const mockSearch = vi.fn();
        render(<SearchBar onSearch={mockSearch} />);

        const inputElement = screen.getByPlaceholderText(/search by email/i);

        fireEvent.change(inputElement, { target: { value: 'test@example.com' } });

        // Because we mocked debounce to return value immediately,
        // onSearch should be called directly
        await waitFor(() => {
            expect(mockSearch).toHaveBeenCalledWith('test@example.com');
        });
    });

    it('calls onSearch on every change (debounced)', async () => {
        const mockSearch = vi.fn();
        render(<SearchBar onSearch={mockSearch} />);

        const inputElement = screen.getByPlaceholderText(/search by email/i);

        fireEvent.change(inputElement, { target: { value: 'test' } });
        fireEvent.change(inputElement, { target: { value: 'test@example.com' } });

        await waitFor(() => {
            expect(mockSearch).toHaveBeenLastCalledWith('test@example.com');
        });
    });
});
