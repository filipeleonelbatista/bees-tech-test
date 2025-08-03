import { useState } from 'react';

export interface Brewery {
    id: string;
    name: string;
    [key: string]: any;
}

const proxy_url = import.meta.env.DEV ? 'https://cors-anywhere-filipeleonelbatista.onrender.com/' : '';

export const useBrewerySearch = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<Brewery[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true)
        try {
            const res = await fetch(
                `${proxy_url}https://api.openbrewerydb.org/v1/breweries/search?per_page=6&query=${encodeURIComponent(search)}`
            );
            const data = await res.json();
            setResults(data);
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    };



    return { search, setSearch, results, loading, handleSearch };
};
