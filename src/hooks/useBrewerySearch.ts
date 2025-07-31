import { useEffect, useState } from 'react';

export interface Brewery {
    id: string;
    name: string;
    [key: string]: any;
}

export const useBrewerySearch = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<Brewery[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            if (search.trim() !== '') {
                setLoading(true);
                fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(search)}`, {
                    signal: controller.signal,
                })
                    .then(res => res.json())
                    .then(setResults)
                    .catch(() => setResults([]))
                    .finally(() => setLoading(false));
            } else {
                setResults([]);
            }
        }, 500); 

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [search]);

    return { search, setSearch, results, loading };
};
