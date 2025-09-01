import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GenderFilter from '../GenderFilter';

describe('GenderFilter Component', () => {
    it('renders select with correct options', () => {
        const mockFn = vi.fn();
        render(<GenderFilter onFilter={mockFn} />);

        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent('All');
        expect(options[1]).toHaveTextContent('Male');
        expect(options[2]).toHaveTextContent('Female');
    });

    it('calls onFilter with selected value', () => {
        const mockFn = vi.fn();
        render(<GenderFilter onFilter={mockFn} />);

        const select = screen.getByRole('combobox');

        // Simulate changing the value to "male"
        fireEvent.change(select, { target: { value: 'male' } });
        expect(mockFn).toHaveBeenCalledWith('male');

        // Simulate changing the value to "female"
        fireEvent.change(select, { target: { value: 'female' } });
        expect(mockFn).toHaveBeenCalledWith('female');
    });

    it('has the correct default value', () => {
        const mockFn = vi.fn();
        render(<GenderFilter onFilter={mockFn} />);

        const select = screen.getByRole('combobox');
        expect(select).toHaveValue('all'); // as per useState('') initial value
    });
});
