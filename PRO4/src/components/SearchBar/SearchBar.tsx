import { useEffect, useState } from "react";
import './style.css';
import { useDebounce } from "../../hooks/useDebounce";

export interface SearchBarProps {
    onSearch?: (term: string) => void;
    pageSet: (page: number) => void;
}
const SearchBar = (props: SearchBarProps) => {
    const { onSearch, pageSet } = props;

    const [input, setInput] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }
    const debouncedInput = useDebounce(input, 500);
    useEffect(() => {
        if (onSearch) {
            onSearch(debouncedInput);
            pageSet(1)
        }
    }, [debouncedInput, onSearch])
    return (
        <input value={input} onChange={handleInputChange} placeholder="Search products..." />
    )
}
export default SearchBar;