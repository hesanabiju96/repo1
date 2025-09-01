import { useState, useEffect } from 'react';
export const useDebounce = (value: string, delay: number = 300): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timerId);
        };
    }, [value, delay]);
    return debouncedValue;
}