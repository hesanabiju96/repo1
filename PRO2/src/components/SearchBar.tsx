import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = (props) => {
    const [input, setInput] = useState('');
    const { onSearch } = props;
    const debouncedInput = useDebounce(input);

    useEffect(() => {
        onSearch(debouncedInput);
    }, [debouncedInput, onSearch]);


    return (
        <>
            <input
                style={{ margin: '0rem 0', height: '32px', width: '40%' }}
                type="text"
                placeholder="Search by email"
                onChange={(e) => setInput(e.target.value)}
            />
        </>
    )
}
export default SearchBar;