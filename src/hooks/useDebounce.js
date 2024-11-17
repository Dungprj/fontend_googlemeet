import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounced, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value]);

    return debounced;
}

export default useDebounce;
